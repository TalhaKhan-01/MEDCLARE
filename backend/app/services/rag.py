"""RAG Retrieval Engine — semantic + keyword medical knowledge retrieval."""
import os
from typing import List, Dict

# Global collection reference
_collection = None

def _get_collection():
    global _collection
    if _collection is not None:
        return _collection
    try:
        import chromadb
        from app.config import settings
        client = chromadb.Client()
        _collection = client.get_or_create_collection(
            name="medical_knowledge",
            metadata={"hnsw:space": "cosine"}
        )
        if _collection.count() == 0:
            _seed_knowledge(_collection)
        return _collection
    except Exception as e:
        print(f"ChromaDB init failed: {e}. Using fallback retrieval.")
        return None

def _seed_knowledge(collection):
    """Seed the vector DB with curated medical knowledge."""
    knowledge = _get_knowledge_base()
    ids = [f"doc_{i}" for i in range(len(knowledge))]
    documents = [k["content"] for k in knowledge]
    metadatas = [{"category": k["category"], "source": k["source"]} for k in knowledge]
    collection.add(ids=ids, documents=documents, metadatas=metadatas)

def _get_knowledge_base() -> List[Dict]:
    """Curated medical reference knowledge."""
    return [
        {"category": "Hematology", "source": "WHO Guidelines",
         "content": "Hemoglobin levels below 12 g/dL in women and 13 g/dL in men indicate anemia. Low hemoglobin can result from iron deficiency, chronic disease, or vitamin deficiencies. Mild anemia (10-12 g/dL) often presents with fatigue and pallor. Values below 8 g/dL require urgent medical attention."},
        {"category": "Hematology", "source": "Harrison's Principles",
         "content": "Elevated WBC count (leukocytosis) above 11 K/uL may indicate infection, inflammation, stress response, or rarely leukemia. Mild elevations (11-15 K/uL) are commonly associated with bacterial infections. The differential count helps determine the specific type of immune response."},
        {"category": "Hematology", "source": "Clinical Pathology Guidelines",
         "content": "ESR (Erythrocyte Sedimentation Rate) is a nonspecific marker of inflammation. Values above 20 mm/hr may indicate infection, autoimmune conditions, or tissue injury. ESR naturally increases with age. Markedly elevated ESR (>100 mm/hr) warrants investigation for serious conditions."},
        {"category": "Hematology", "source": "WHO Clinical Guidelines",
         "content": "Low hematocrit values indicate reduced red blood cell volume and may suggest anemia, overhydration, or blood loss. Hematocrit below 36% in women and 39% in men is considered low. Combined with low hemoglobin, it confirms anemia diagnosis."},
        {"category": "Metabolic", "source": "ADA Standards of Medical Care",
         "content": "Fasting glucose between 100-125 mg/dL indicates prediabetes. Values above 126 mg/dL on two separate tests indicate diabetes mellitus. HbA1c between 5.7-6.4% confirms prediabetic state. Lifestyle modifications can prevent progression to diabetes in prediabetic patients."},
        {"category": "Metabolic", "source": "ADA Guidelines 2024",
         "content": "HbA1c reflects average blood glucose over 2-3 months. Values of 5.7-6.4% indicate prediabetes, while 6.5% or above indicates diabetes. For diagnosed diabetics, target HbA1c is generally below 7%. Each 1% reduction in HbA1c reduces microvascular complications by approximately 40%."},
        {"category": "Kidney", "source": "KDIGO Guidelines",
         "content": "Elevated uric acid above 7 mg/dL in men or 6 mg/dL in women (hyperuricemia) increases risk of gout and kidney stones. Chronic hyperuricemia may also be associated with cardiovascular disease and metabolic syndrome. Dietary modification and adequate hydration are first-line interventions."},
        {"category": "Lipid", "source": "ACC/AHA Cholesterol Guidelines",
         "content": "Total cholesterol above 200 mg/dL is considered borderline high. LDL cholesterol above 100 mg/dL increases cardiovascular risk. Elevated triglycerides above 150 mg/dL are associated with metabolic syndrome. The total cholesterol to HDL ratio is a strong predictor of cardiovascular risk."},
        {"category": "Lipid", "source": "ESC Cardiovascular Prevention",
         "content": "LDL cholesterol is the primary driver of atherosclerosis. Values above 100 mg/dL warrant lifestyle intervention, and above 130 mg/dL may require pharmacological treatment depending on overall cardiovascular risk. Statin therapy reduces LDL by 30-50% and is first-line treatment."},
        {"category": "Lipid", "source": "AHA Lipid Guidelines",
         "content": "Triglycerides above 150 mg/dL indicate hypertriglyceridemia. Elevated triglycerides combined with low HDL and high LDL constitute atherogenic dyslipidemia, significantly increasing cardiovascular risk. Dietary changes, exercise, and omega-3 supplementation can help reduce triglycerides."},
        {"category": "Liver", "source": "AASLD Practice Guidelines",
         "content": "SGPT (ALT) is more specific to liver injury than SGOT (AST). ALT above 56 U/L may indicate hepatocellular damage. Common causes include fatty liver disease, medications, viral hepatitis, and alcohol use. ALT/AST ratio helps differentiate causes — ratio >2 suggests alcoholic liver disease."},
        {"category": "Thyroid", "source": "ATA Thyroid Guidelines",
         "content": "TSH above 4.0 mIU/L with normal free T4 indicates subclinical hypothyroidism. TSH above 10 mIU/L typically requires treatment. Symptoms include fatigue, weight gain, cold intolerance, and cognitive changes. Treatment with levothyroxine is standard when TSH is persistently elevated."},
        {"category": "Iron Studies", "source": "WHO Iron Deficiency Guidelines",
         "content": "Serum iron below 60 ug/dL combined with low ferritin suggests iron deficiency. This is the most common nutritional deficiency worldwide. Iron deficiency anemia presents with fatigue, pallor, and reduced exercise tolerance. Oral iron supplementation is first-line treatment, best absorbed with vitamin C."},
        {"category": "Vitamins", "source": "Endocrine Society Guidelines",
         "content": "Vitamin D levels below 30 ng/mL indicate insufficiency, and below 20 ng/mL indicate deficiency. Vitamin D deficiency is associated with bone loss, muscle weakness, and increased infection risk. Supplementation with 1000-4000 IU daily is generally recommended for deficiency correction."},
        {"category": "Vitamins", "source": "Clinical Nutrition Guidelines",
         "content": "Vitamin B12 deficiency (below 200 pg/mL) can cause megaloblastic anemia and neurological symptoms. Common in vegetarians, elderly, and patients with pernicious anemia. Early supplementation prevents irreversible neurological damage. Oral or intramuscular supplementation is effective."},
        {"category": "General", "source": "Clinical Interpretation Guidelines",
         "content": "When multiple blood parameters are abnormal simultaneously, they often point to interconnected conditions. For example, low hemoglobin with low iron and low ferritin suggests iron-deficiency anemia. Elevated glucose with elevated HbA1c confirms diabetes. Pattern recognition across parameters improves diagnostic accuracy."},
    ]

def retrieve_evidence(abnormal_findings: List[Dict], top_k: int = 5) -> List[Dict]:
    """Retrieve relevant medical knowledge for abnormal findings."""
    collection = _get_collection()
    
    if not abnormal_findings:
        return []
    
    # Build queries from abnormal findings
    queries = []
    for finding in abnormal_findings:
        status_word = "elevated" if finding["status"] in ("high", "critical") else "low"
        query = f"{finding['test_name']} {status_word} {finding['value']} {finding.get('unit', '')} clinical significance"
        queries.append(query)
    
    results = []
    
    if collection is not None:
        try:
            for query in queries:
                res = collection.query(query_texts=[query], n_results=min(top_k, 3))
                if res and res['documents']:
                    for i, doc in enumerate(res['documents'][0]):
                        meta = res['metadatas'][0][i] if res['metadatas'] else {}
                        distance = res['distances'][0][i] if res['distances'] else 0
                        results.append({
                            "content": doc,
                            "source": meta.get("source", "Medical Reference"),
                            "category": meta.get("category", "General"),
                            "relevance_score": round(1 - distance, 3) if distance else 0.8
                        })
        except Exception as e:
            print(f"ChromaDB retrieval failed: {e}")
            results = _fallback_retrieval(abnormal_findings)
    else:
        results = _fallback_retrieval(abnormal_findings)
    
    # Deduplicate and rank
    seen = set()
    unique = []
    for r in sorted(results, key=lambda x: x["relevance_score"], reverse=True):
        key = r["content"][:100]
        if key not in seen:
            seen.add(key)
            unique.append(r)
    
    return unique[:top_k]

def _fallback_retrieval(findings: List[Dict]) -> List[Dict]:
    """Keyword-based fallback when vector DB is unavailable."""
    knowledge = _get_knowledge_base()
    results = []
    for finding in findings:
        test_name = finding["test_name"].lower()
        category = finding.get("category", "").lower()
        for k in knowledge:
            if test_name in k["content"].lower() or category in k["category"].lower():
                results.append({
                    "content": k["content"],
                    "source": k["source"],
                    "category": k["category"],
                    "relevance_score": 0.75
                })
    return results
