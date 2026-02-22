import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            common: {
                getStarted: "Get Started",
                signIn: "Sign In",
                signOut: "Sign Out",
                loading: "Loading...",
                back: "Back",
                upload: "Upload",
                reports: "Reports",
                patient: "Patient",
                doctor: "Doctor",
                save: "Save",
                cancel: "Cancel",
                delete: "Delete",
                error: "Error",
                success: "Success",
                items: "items",
                parameters: "Parameters",
                edit: "Edit"
            },
            navbar: {
                reports: "Reports",
                upload: "Upload",
                signOut: "Sign Out"
            },
            landing: {
                badge: "Medical Interpretation Platform",
                title: "Understand Your Lab Results with Clarity",
                description: "MEDCLARE transforms complex medical reports into clear, grounded explanations — verified by healthcare professionals, backed by clinical evidence.",
                feature1Title: "Structured Analysis",
                feature1Desc: "Every finding is extracted, normalized, and compared against established reference ranges.",
                feature2Title: "Evidence-Grounded",
                feature2Desc: "Explanations are built on retrieved clinical evidence with traceable citations.",
                feature3Title: "Doctor Verified",
                feature3Desc: "Every interpretation passes through professional verification before reaching you.",
                confidence: "Confidence Scoring",
                citations: "Citation Tracking",
                safety: "Safety Guardrails",
                personalized: "Personalized"
            },
            auth: {
                welcomeBack: "Welcome back",
                signInSubtitle: "Sign in to access your reports",
                createAccount: "Create your account",
                registerSubtitle: "Start understanding your medical reports",
                fullName: "Full Name",
                email: "Email",
                password: "Password",
                passwordHint: "Min 6 characters",
                roleLabel: "I am a",
                noAccount: "Don't have an account?",
                haveAccount: "Already have an account?",
                createOne: "Create one",
                signInLink: "Sign in"
            },
            dashboard: {
                title: "My Reports",
                doctorTitle: "Patient Reports",
                subtitle: "Track your medical report interpretations",
                doctorSubtitle: "Review and verify patient report interpretations",
                uploadBtn: "Upload Report",
                total: "Total Reports",
                verified: "Verified",
                pending: "Pending Review",
                processing: "Processing",
                noReports: "No reports yet",
                uploadFirst: "Upload your first medical report to get started"
            },
            upload: {
                title: "Upload Medical Report",
                subtitle: "Upload a blood test or lab report for AI-powered interpretation",
                dropzone: "Drop your report here",
                orClick: "or click to browse",
                formatHint: "PDF, PNG, JPG, TIFF",
                reportTitle: "Report Title",
                detailLevel: "Explanation Detail Level",
                levels: {
                    simple: "Simple — Easy to understand",
                    standard: "Standard — Clear with medical context",
                    detailed: "Detailed — Clinical depth"
                },
                analyzeBtn: "Analyze Report",
                processingTitle: "Processing Your Report",
                pipeline: {
                    upload: "Uploading Report",
                    ocr: "Optical Character Recognition",
                    extract: "Extracting Structured Findings",
                    retrieve: "Retrieving Medical Evidence",
                    explain: "Generating Grounded Explanation",
                    guardrail: "Running Safety Checks",
                    personalize: "Applying Personalization",
                    complete: "Interpretation Complete"
                }
            },
            report: {
                backToReports: "Back to Reports",
                date: "Date",
                findings: "Structured Findings",
                medications: "Prescribed Medications",
                explanation: "Grounded Explanation",
                confidence: "Confidence Assessment",
                categories: {
                    general: "General",
                    hematology: "Hematology",
                    biochemistry: "Biochemistry",
                    thyroid: "Thyroid Function",
                    vitamin: "Vitamins",
                    diabetes: "Diabetes Markers",
                    liver: "Liver Function",
                    kidney: "Kidney Function",
                    lipid: "Lipid Profile"
                },
                tabs: { findings: "Structured Findings", medications: "Prescribed Medications", explanation: "Grounded Explanation" },
                table: { parameter: "Parameter", value: "Value", range: "Reference Range", status: "Status" },
                status: { normal: "Normal", high: "High", low: "Low", critical: "Critical", abnormal: "Abnormal Findings" },
                dosage: "Dosage", frequency: "Frequency", duration: "Duration", instructions: "Instructions",
                sourcesCitations: "Sources & Citations",
                confidenceAssessment: "Confidence Assessment",
                confidenceDesc: "Aggregated confidence across all pipeline stages",
                "confidence": { high: "High Confidence", moderate: "Moderate Confidence", low: "Low Confidence" },
                doctorVerified: "Doctor Verified",
                pendingVerification: "Pending Verification",
                needsRevision: "Needs Revision",
                verifiedOn: "Verified on",
                pendingDesc: "This interpretation is awaiting professional review",
                rejectedDesc: "A healthcare professional has requested changes",
                trustSafety: "Trust & Safety",
                disclaimerTitle: "Medical Disclaimer",
                disclaimerDesc: "This interpretation is generated by an AI system and is intended for informational purposes only. It does not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional.",
                versions: "Versions", version: "Version", original: "Original", edited: "Edited",
                noExplanation: "No explanation generated yet.",
                verificationActions: "Verification Actions",
                doctorNotes: "Doctor Notes",
                notesPlaceholder: "Add any notes for the patient...",
                approveBtn: "Approve", rejectBtn: "Reject",
                verification: {
                    verified: "Doctor Verified",
                    pending: "Pending Verification",
                    rejected: "Needs Revision",
                    verifiedOn: "Verified on",
                    awaiting: "This interpretation is awaiting professional review",
                    requestedChanges: "A healthcare professional has requested changes"
                },
                safety: "Safety Signals",
                disclaimer: {
                    title: "Medical Disclaimer",
                    text: "This interpretation is generated by an AI system and is intended for informational purposes only. It does not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional."
                }
            }
        }
    },
    hi: {
        translation: {
            common: {
                getStarted: "शुरू करें", signIn: "लॉग इन करें", signOut: "साइन आउट",
                loading: "लोड हो रहा है...", back: "पीछे", upload: "अपलोड",
                reports: "रिपोर्ट्स", patient: "मरीज", doctor: "डॉक्टर",
                save: "सहेजें", cancel: "रद्द करें", delete: "हटाएं",
                error: "त्रुटि", success: "सफलता",
                items: "आइटम", parameters: "पैरामीटर", edit: "संपादन"
            },
            navbar: {
                reports: "रिपोर्ट्स",
                upload: "अपलोड",
                signOut: "साइन आउट"
            },
            landing: {
                badge: "मेडिकल इंटरप्रिटेशन प्लेटफार्म",
                title: "अपनी लैब रिपोर्ट को स्पष्टता से समझें",
                description: "MEDCLARE जटिल मेडिकल रिपोर्टों को स्पष्ट और प्रमाणित स्पष्टीकरणों में बदल देता है — जो स्वास्थ्य पेशेवरों द्वारा सत्यापित और नैदानिक साक्ष्यों द्वारा समर्थित हैं।",
                feature1Title: "व्यवस्थित विश्लेषण",
                feature1Desc: "प्रत्येक खोज को निकाला जाता है, सामान्य किया जाता है, और स्थापित संदर्भ श्रेणियों के साथ तुलना की जाती है।",
                feature2Title: "साक्ष्य-आधारित",
                feature2Desc: "स्पष्टीकरण ट्रैक करने योग्य उद्धरणों के साथ प्राप्त नैदानिक साक्ष्यों पर बनाए गए हैं।",
                feature3Title: "डॉक्टर द्वारा सत्यापित",
                feature3Desc: "प्रत्येक व्याख्या आप तक पहुँचने से पहले पेशेवर सत्यापन से गुजरती है।",
                confidence: "आत्मविश्वास स्कोरिंग",
                citations: "उद्धरण ट्रैकिंग",
                safety: "सुरक्षा दिशानिर्देश",
                personalized: "व्यक्तिगत"
            },
            auth: {
                welcomeBack: "वापसी पर स्वागत है",
                signInSubtitle: "अपनी रिपोर्ट देखने के लिए साइन इन करें",
                createAccount: "अपना खाता बनाएँ",
                registerSubtitle: "अपनी मेडिकल रिपोर्ट समझना शुरू करें",
                fullName: "पूरा नाम",
                email: "ईमेल",
                password: "पासवर्ड",
                passwordHint: "कम से कम 6 अक्षर",
                roleLabel: "मैं हूँ एक",
                noAccount: "खाता नहीं है?",
                haveAccount: "पहले से ही एक खाता है?",
                createOne: "एक बनाएँ",
                signInLink: "लॉग इन करें"
            },
            dashboard: {
                title: "मेरी रिपोर्ट्स",
                doctorTitle: "मरीज की रिपोर्ट्स",
                subtitle: "अपनी मेडिकल रिपोर्ट व्याख्याओं को ट्रैक करें",
                doctorSubtitle: "मरीज की रिपोर्ट व्याख्याओं की समीक्षा और सत्यापन करें",
                uploadBtn: "रिपोर्ट अपलोड करें",
                total: "कुल रिपोर्ट्स",
                verified: "सत्यापित",
                pending: "समीक्षा लंबित",
                processing: "प्रसंस्करण",
                noReports: "अभी तक कोई रिपोर्ट नहीं",
                uploadFirst: "शुरू करने के लिए अपनी पहली मेडिकल रिपोर्ट अपलोड करें"
            },
            upload: {
                title: "मेडिकल रिपोर्ट अपलोड करें",
                subtitle: "एआई-पावर्ड व्याख्या के लिए रक्त परीक्षण या लैब रिपोर्ट अपलोड करें",
                dropzone: "अपनी रिपोर्ट यहाँ छोड़ें",
                orClick: "या ब्राउज़ करने के लिए क्लिक करें",
                formatHint: "PDF, PNG, JPG, TIFF",
                reportTitle: "रिपोर्ट का शीर्षक",
                detailLevel: "व्याख्या विस्तार स्तर",
                levels: {
                    simple: "सरल — समझने में आसान",
                    standard: "मानक — मेडिकल संदर्भ के साथ स्पष्ट",
                    detailed: "विस्तृत — नैदानिक गहराई"
                },
                analyzeBtn: "रिपोर्ट का विश्लेषण करें",
                processingTitle: "आपकी रिपोर्ट संसाधित की जा रही है",
                pipeline: {
                    upload: "रिपोर्ट अपलोड की जा रही है",
                    ocr: "ऑप्टिकल कैरेक्टर रिकग्निशन",
                    extract: "व्यवस्थित निष्कर्ष निकालना",
                    retrieve: "मेडिकल साक्ष्य प्राप्त करना",
                    explain: "प्रमाणित स्पष्टीकरण तैयार करना",
                    guardrail: "सुरक्षा जाँच चलाना",
                    personalize: "वैयक्तिकरण लागू करना",
                    complete: "व्याख्या पूरी हुई"
                }
            },
            report: {
                backToReports: "रिपोर्ट्स पर वापस जाएँ",
                date: "तारीख",
                findings: "व्यवस्थित निष्कर्ष",
                medications: "निर्धारित दवाएं",
                explanation: "प्रमाणित स्पष्टीकरण",
                confidence: "आत्मविश्वास मूल्यांकन",
                categories: {
                    general: "सामान्य",
                    hematology: "रक्त विज्ञान",
                    biochemistry: "जैव रसायन",
                    thyroid: "थायराइड कार्य",
                    vitamin: "विटामिन",
                    diabetes: "मधुमेह संकेतक",
                    liver: "लिवर कार्य",
                    kidney: "किडनी कार्य",
                    lipid: "लिपिड प्रोफाइल"
                },
                tabs: { findings: "व्यवस्थित निष्कर्ष", medications: "निर्धारित दवाएं", explanation: "प्रमाणित स्पष्टीकरण" },
                table: { parameter: "पैरामीटर", value: "मान", range: "संदर्भ श्रेणी", status: "स्थिति" },
                status: { normal: "सामान्य", high: "उच्च", low: "निम्न", critical: "गंभीर", abnormal: "असामान्य निष्कर्ष" },
                dosage: "खुराक", frequency: "आवृत्ति", duration: "अवधि", instructions: "निर्देश",
                sourcesCitations: "स्रोत और उद्धरण",
                confidenceAssessment: "आत्मविश्वास मूल्यांकन",
                confidenceDesc: "सभी पाइपलाइन चरणों का समग्र आत्मविश्वास",
                "confidence": { high: "उच्च आत्मविश्वास", moderate: "मध्यम आत्मविश्वास", low: "निम्न आत्मविश्वास" },
                doctorVerified: "डॉक्टर द्वारा सत्यापित", pendingVerification: "सत्यापन लंबित",
                needsRevision: "संशोधन आवश्यक", verifiedOn: "को सत्यापित",
                pendingDesc: "यह व्याख्या पेशेवर समीक्षा की प्रतीक्षा कर रही है",
                rejectedDesc: "एक स्वास्थ्य पेशेवर ने बदलाव का अनुरोध किया है",
                trustSafety: "विश्वास और सुरक्षा",
                disclaimerTitle: "चिकित्सा अस्वीकरण",
                disclaimerDesc: "यह व्याख्या एआई सिस्टम द्वारा उत्पन्न की गई है और केवल सूचनात्मक उद्देश्यों के लिए है।",
                versions: "संस्करण", version: "संस्करण", original: "मूल", edited: "संपादित",
                noExplanation: "अभी तक कोई स्पष्टीकरण नहीं।",
                verificationActions: "सत्यापन कार्य", doctorNotes: "डॉक्टर नोट्स",
                notesPlaceholder: "रोगी के लिए टिप्पणी जोड़ें...",
                approveBtn: "स्वीकृत करें", rejectBtn: "अस्वीकार करें",
                verification: { verified: "डॉक्टर द्वारा सत्यापित", pending: "सत्यापन लंबित", rejected: "संशोधन की आवश्यकता", verifiedOn: "को सत्यापित", awaiting: "यह व्याख्या पेशेवर समीक्षा की प्रतीक्षा कर रही है", requestedChanges: "एक स्वास्थ्य पेशेवर ने बदलाव का अनुरोध किया है" },
                safety: "सुरक्षा संकेत",
                disclaimer: { title: "चिकित्सा अस्वीकरण", text: "यह व्याख्या एआई सिस्टम द्वारा उत्पन्न की गई है और केवल सूचनात्मक उद्देश्यों के लिए है। यह चिकित्सा सलाह नहीं है।" }
            }
        }
    },
    te: {
        translation: {
            common: { getStarted: "ప్రారంభించండి", signIn: "సైన్ ఇన్", signOut: "సైన్ అవుట్", loading: "లోడ్ అవుతోంది...", back: "వెనుకకు", upload: "అప్‌లోడ్", reports: "నివేదికలు", patient: "రోగి", doctor: "డాక్టర్", save: "సేవ్ చేయండి", cancel: "రద్దు చేయండి", delete: "తొలగించు", error: "లోపం", success: "విజయం", items: "అంశాలు", parameters: "పారామీటర్లు", edit: "సవరించు" },
            navbar: { reports: "నివేదికలు", upload: "అప్‌లోడ్", signOut: "సైన్ అవుట్" },
            landing: { badge: "మెడికల్ ఇంటర్ప్రెటేషన్ ప్లాట్‌ఫారమ్", title: "మీ ల్యాబ్ ఫలితాలను స్పష్టతతో అర్థం చేసుకోండి", description: "MEDCLARE సంక్లిష్టమైన వైద్య నివేదికలను స్పష్టమైన వివరణలుగా మారుస్తుంది.", feature1Title: "నిర్మాణాత్మక విశ్లేషణ", feature1Desc: "ప్రతి అంశం సేకరించబడుతుంది మరియు సాధారణ శ్రేణులతో పోల్చబడుతుంది.", feature2Title: "సాక్ష్యాధారిత", feature2Desc: "వివరణలు క్లినికల్ సాక్ష్యాల ఆధారంగా రూపొందించబడ్డాయి.", feature3Title: "డాక్టర్ ధృవీకరించారు", feature3Desc: "ప్రతి వివరణ మీకు చేరేముందు వృత్తిపరమైన ధృవీకరణ పొందుతుంది.", confidence: "కాన్ఫిడెన్స్ స్కోరింగ్", citations: "సైటేషన్ ట్రాకింగ్", safety: "భద్రతా ప్రమాణాలు", personalized: "వ్యక్తిగతీకరించినది" },
            auth: { welcomeBack: "మళ్ళీ స్వాగతం", signInSubtitle: "మీ నివేదికలను చూడటానికి సైన్ ఇన్ చేయండి", createAccount: "మీ ఖాతాను సృష్టించండి", registerSubtitle: "మీ వైద్య నివేదికలను అర్థం చేసుకోవడం ప్రారంభించండి", fullName: "పూర్తి పేరు", email: "ఇమెయిల్", password: "పాస్‌వర్డ్", passwordHint: "కనీసం 6 అక్షరాలు", roleLabel: "నేను ఒక", noAccount: "ఖాతా లేదా?", haveAccount: "ఇప్పటికే ఖాతా ఉందా?", createOne: "ఒకటి సృష్టించండి", signInLink: "సైన్ ఇన్" },
            dashboard: { title: "నా నివేదికలు", doctorTitle: "రోగి నివేదికలు", subtitle: "మీ వైద్య నివేదిక వివరణలను ట్రాక్ చేయండి", doctorSubtitle: "రోగి నివేదిక వివరణలను సమీక్షించండి", uploadBtn: "నివేదిక అప్‌లోడ్", total: "మొత్తం నివేదికలు", verified: "ధృవీకరించబడింది", pending: "సమీక్ష పెండింగ్", processing: "ప్రాసెసింగ్", noReports: "ఇంకా నివేదికలు లేవు", uploadFirst: "మీ మొదటి వైద్య నివేదికను అప్‌లోడ్ చేయండి" },
            upload: { title: "వైద్య నివేదిక అప్‌లోడ్", subtitle: "AI వివరణ కోసం రక్త పరీక్ష లేదా ల్యాబ్ నివేదిక అప్‌లోడ్ చేయండి", dropzone: "మీ నివేదికను ఇక్కడ వదలండి", orClick: "బ్రౌజ్ చేయడానికి క్లిక్ చేయండి", formatHint: "PDF, PNG, JPG, TIFF", reportTitle: "నివేదిక శీర్షిక", detailLevel: "వివరణ వివరాల స్థాయి", levels: { simple: "సరళం — అర్థం చేసుకోవడం సులభం", standard: "ప్రామాణికం — వైద్య సందర్భంతో స్పష్టం", detailed: "వివరంగా — క్లినికల్ లోతు" }, analyzeBtn: "నివేదికను విశ్లేషించండి", processingTitle: "మీ నివేదిక ప్రాసెస్ అవుతోంది", pipeline: { upload: "నివేదిక అప్‌లోడ్ అవుతోంది", ocr: "ఆప్టికల్ క్యారెక్టర్ రికగ్నిషన్", extract: "నిర్మాణాత్మక ఫలితాలను సంగ్రహించడం", retrieve: "వైద్య ఆధారాలను పొందడం", explain: "వివరణను రూపొందించడం", guardrail: "భద్రతా తనిఖీలు", personalize: "వ్యక్తిగతీకరణ", complete: "వివరణ పూర్తయింది" } },
            report: {
                backToReports: "నివేదికలకు తిరిగి", date: "తేదీ", findings: "నిర్మాణాత్మక ఫలితాలు", medications: "సూచించిన మందులు", explanation: "వివరణ", confidence: "నమ్మకం అంచనా",
                categories: {
                    general: "సాధారణం",
                    hematology: "హెమటాలజీ",
                    biochemistry: "బయోకెమిస్ట్రీ",
                    thyroid: "థైరాయిడ్ పనితీరు",
                    vitamin: "విటమిన్లు",
                    diabetes: "డయాబెటిస్ మార్కర్లు",
                    liver: "కాలేయ పనితీరు",
                    kidney: "మూత్రపిండాల పనితీరు",
                    lipid: "లిపిడ్ ప్రొఫైల్"
                },
                tabs: { findings: "నిర్మాణాత్మక ఫలితాలు", medications: "సూచించిన మందులు", explanation: "వివరణ" }, table: { parameter: "పారామీటర్", value: "విలువ", range: "సూచన పరిధి", status: "స్థితి" }, status: { normal: "సాధారణం", high: "ఎక్కువ", low: "తక్కువ", critical: "తీవ్రం", abnormal: "అసాధారణ ఫలితాలు" }, dosage: "మోతాదు", frequency: "తరచుదనం", duration: "వ్యవధి", instructions: "సూచనలు", sourcesCitations: "మూలాలు & ఉల్లేఖనాలు", confidenceAssessment: "నమ్మకం అంచనా", confidenceDesc: "అన్ని దశల మొత్తం నమ్మకం", "confidence": { high: "అధిక నమ్మకం", moderate: "మధ్యస్థ నమ్మకం", low: "తక్కువ నమ్మకం" }, doctorVerified: "డాక్టర్ ధృవీకరించారు", pendingVerification: "ధృవీకరణ పెండింగ్", needsRevision: "సవరణ అవసరం", verifiedOn: "ధృవీకరించిన తేదీ", pendingDesc: "ఈ వివరణ వృత్తిపరమైన సమీక్ష కోసం వేచి ఉంది", rejectedDesc: "ఒక వైద్య నిపుణుడు మార్పులను అభ్యర్థించారు", trustSafety: "నమ్మకం & భద్రత", disclaimerTitle: "వైద్య నిరాకరణ", disclaimerDesc: "ఈ వివరణ AI వ్యవస్థ ద్వారా రూపొందించబడింది మరియు సమాచార ప్రయోజనాల కోసం మాత్రమే।", versions: "సంస్కరణలు", version: "సంస్కరణ", original: "అసలు", edited: "సవరించబడింది", noExplanation: "ఇంకా వివరణ లేదు.", verificationActions: "ధృవీకరణ చర్యలు", doctorNotes: "డాక్టర్ నోట్స్", notesPlaceholder: "రోగికి నోట్స్ జోడించండి...", approveBtn: "ఆమోదించు", rejectBtn: "తిరస్కరించు", verification: { verified: "డాక్టర్ ధృవీకరించారు", pending: "ధృవీకరణ పెండింగ్", rejected: "సవరణ అవసరం", verifiedOn: "ధృవీకరించిన తేదీ", awaiting: "ఈ వివరణ వృత్తిపరమైన సమీక్ష కోసం వేచి ఉంది", requestedChanges: "ఒక వైద్య నిపుణుడు మార్పులను అభ్యర్థించారు" }, safety: "భద్రతా సంకేతాలు", disclaimer: { title: "వైద్య నిరాకరణ", text: "ఈ వివరణ AI వ్యవస్థ ద్వారా రూపొందించబడింది మరియు సమాచార ప్రయోజనాల కోసం మాత్రమే।" }
            }
        }
    },
    ta: {
        translation: {
            common: { getStarted: "தொடங்கவும்", signIn: "உள்நுழைக", signOut: "வெளியேறுக", loading: "ஏற்றப்படுகிறது...", back: "பின்செல்", upload: "பதிவேற்று", reports: "அறிக்கைகள்", patient: "நோயாளி", doctor: "மருத்துவர்", save: "சேமி", cancel: "ரத்து", delete: "நீக்கு", error: "பிழை", success: "வெற்றி", items: "உருப்படிகள்", parameters: "அளவுருக்கள்", edit: "திருத்து" },
            navbar: { reports: "அறிக்கைகள்", upload: "பதிவேற்று", signOut: "வெளியேறுக" },
            landing: { badge: "மருத்துவ விளக்க தளம்", title: "உங்கள் ஆய்வக முடிவுகளை தெளிவுடன் புரிந்து கொள்ளுங்கள்", description: "MEDCLARE சிக்கலான மருத்துவ அறிக்கைகளை தெளிவான விளக்கங்களாக மாற்றுகிறது.", feature1Title: "கட்டமைக்கப்பட்ட பகுப்பாய்வு", feature1Desc: "ஒவ்வொரு கண்டுபிடிப்பும் சேகரிக்கப்படுகிறது மற்றும் குறிப்பு வரம்புகளுடன் ஒப்பிடப்படுகிறது.", feature2Title: "ஆதாரங்களின் அடிப்படையில்", feature2Desc: "விளக்கங்கள் மருத்துவ ஆதாரங்களின் அடிப்படையில் உருவாக்கப்படுகின்றன.", feature3Title: "மருத்துவர் சரிபார்த்தார்", feature3Desc: "ஒவ்வொரு விளக்கமும் தொழில்முறை சரிபார்ப்பைப் பெறுகிறது.", confidence: "நம்பிக்கை மதிப்பீடு", citations: "மேற்கோள் கண்காணிப்பு", safety: "பாதுகாப்பு வழிகாட்டுதல்கள்", personalized: "தனிப்பயனாக்கப்பட்டது" },
            auth: { welcomeBack: "மீண்டும் வருக", signInSubtitle: "உங்கள் அறிக்கைகளை அணுக உள்நுழையவும்", createAccount: "உங்கள் கணக்கை உருவாக்கவும்", registerSubtitle: "உங்கள் மருத்துவ அறிக்கைகளைப் புரிந்துகொள்ளத் தொடங்குங்கள்", fullName: "முழு பெயர்", email: "மின்னஞ்சல்", password: "கடவுச்சொல்", passwordHint: "குறைந்தது 6 எழுத்துக்கள்", roleLabel: "நான் ஒரு", noAccount: "கணக்கு இல்லையா?", haveAccount: "ஏற்கனவே கணக்கு உள்ளதா?", createOne: "ஒன்றை உருவாக்கவும்", signInLink: "உள்நுழையவும்" },
            dashboard: { title: "எனது அறிக்கைகள்", doctorTitle: "நோயாளி அறிக்கைகள்", subtitle: "உங்கள் மருத்துவ அறிக்கை விளக்கங்களைக் கண்காணிக்கவும்", doctorTitle: "நோயாளி அறிக்கைகள்", doctorSubtitle: "நோயாளி அறிக்கைகளை மதிப்பாய்வு செய்யவும்", uploadBtn: "அறிக்கை பதிவேற்று", total: "மொத்த அறிக்கைகள்", verified: "சரிபார்க்கப்பட்டது", pending: "மதிப்பாய்வு நிலுவையில்", processing: "செயலாக்கம்", noReports: "இன்னும் அறிக்கைகள் இல்லை", uploadFirst: "உங்கள் முதல் மருத்துவ அறிக்கையை பதிவேற்றவும்" },
            upload: { title: "மருத்துவ அறிக்கை பதிவேற்று", subtitle: "AI விளக்கத்திற்கு இரத்த பரிசோதனை பதிவேற்றவும்", dropzone: "உங்கள் அறிக்கையை இங்கே விடுங்கள்", orClick: "உலாவ கிளிக் செய்யவும்", formatHint: "PDF, PNG, JPG, TIFF", reportTitle: "அறிக்கை தலைப்பு", detailLevel: "விளக்க விவர நிலை", levels: { simple: "எளிமை — புரிந்துகொள்ள சுலபம்", standard: "நிலையான — மருத்துவ சூழலுடன் தெளிவு", detailed: "விரிவான — மருத்துவ ஆழம்" }, analyzeBtn: "அறிக்கையை பகுப்பாய்வு செய்", processingTitle: "உங்கள் அறிக்கை செயலாக்கப்படுகிறது", pipeline: { upload: "அறிக்கை பதிவேற்றம்", ocr: "ஒளியியல் எழுத்து அங்கீகாரம்", extract: "கட்டமைக்கப்பட்ட முடிவுகளை பிரித்தெடுத்தல்", retrieve: "மருத்துவ ஆதாரங்களைப் பெறுதல்", explain: "விளக்கத்தை உருவாக்குதல்", guardrail: "பாதுகாப்பு சோதனைகள்", personalize: "தனிப்பயனாக்கம்", complete: "விளக்கம் முடிந்தது" } },
            report: {
                backToReports: "அறிக்கைகளுக்குத் திரும்பு", date: "தேதி", findings: "கட்டமைக்கப்பட்ட முடிவுகள்", medications: "பரிந்துரைக்கப்பட்ட மருந்துகள்", explanation: "விளக்கம்", confidence: "நம்பிக்கை மதிப்பீடு",
                categories: {
                    general: "பொதுவானது",
                    hematology: "ஹீமாட்டாலஜி",
                    biochemistry: "பயோகெமிஸ்ட்ரி",
                    thyroid: "தைராய்டு செயல்பாடு",
                    vitamin: "வைட்டமின்கள்",
                    diabetes: "நீரிழிவு குறிப்பான்கள்",
                    liver: "கல்லீரல் செயல்பாடு",
                    kidney: "சிறுநீரக செயல்பாடு",
                    lipid: "லிபிட் புரொஃபைல்"
                },
                tabs: { findings: "கட்டமைக்கப்பட்ட முடிவுகள்", medications: "பரிந்துரைக்கப்பட்ட மருந்துகள்", explanation: "விளக்கம்" }, table: { parameter: "அளவுரு", value: "மதிப்பு", range: "குறிப்பு வரம்பு", status: "நிலை" }, status: { normal: "சாதாரணம்", high: "அதிகம்", low: "குறைவு", critical: "தீவிரம்", abnormal: "அசாதாரண முடிவுகள்" }, dosage: "மருந்தளவு", frequency: "தொடர்ச்சி", duration: "காலம்", instructions: "வழிமுறைகள்", sourcesCitations: "ஆதாரங்கள் & மேற்கோள்கள்", confidenceAssessment: "நம்பிக்கை மதிப்பீடு", confidenceDesc: "அனைத்து நிலைகளின் மொத்த நம்பிக்கை", "confidence": { high: "அதிக நம்பிக்கை", moderate: "மிதமான நம்பிக்கை", low: "குறைந்த நம்பிக்கை" }, doctorVerified: "மருத்துவர் சரிபார்த்தார்", pendingVerification: "சரிபார்ப்பு நிலுவையில்", needsRevision: "திருத்தம் தேவை", verifiedOn: "சரிபார்க்கப்பட்ட தேதி", pendingDesc: "இந்த விளக்கம் தொழில்முறை மதிப்பாய்வுக்கு காத்திருக்கிறது", rejectedDesc: "ஒரு மருத்துவ நிபுணர் மாற்றங்களைக் கோரியுள்ளார்", trustSafety: "நம்பிக்கை & பாதுகாப்பு", disclaimerTitle: "மருத்துவ மறுப்பு", disclaimerDesc: "இந்த விளக்கம் AI அமைப்பால் உருவாக்கப்பட்டது, தகவல் நோக்கத்திற்காக மட்டுமே.", versions: "பதிப்புகள்", version: "பதிப்பு", original: "அசல்", edited: "திருத்தப்பட்டது", noExplanation: "இன்னும் விளக்கம் இல்லை.", verificationActions: "சரிபார்ப்பு செயல்கள்", doctorNotes: "மருத்துவர் குறிப்புகள்", notesPlaceholder: "நோயாளிக்கு குறிப்புகளைச் சேர்க்கவும்...", approveBtn: "ஒப்புதல்", rejectBtn: "நிராகரி", verification: { verified: "மருத்துவர் சரிபார்த்தார்", pending: "சரிபார்ப்பு நிலுவையில்", rejected: "திருத்தம் தேவை", verifiedOn: "சரிபார்க்கப்பட்ட தேதி", awaiting: "இந்த விளக்கம் தொழில்முறை மதிப்பாய்வுக்கு காத்திருக்கிறது", requestedChanges: "ஒரு மருத்துவ நிபுணர் மாற்றங்களைக் கோரியுள்ளார்" }, safety: "பாதுகாப்பு குறிகாட்டிகள்", disclaimer: { title: "மருத்துவ மறுப்பு", text: "இந்த விளக்கம் AI அமைப்பால் உருவாக்கப்பட்டது, தகவல் நோக்கத்திற்காக மட்டுமே।" }
            }
        }
    },
    or: {
        translation: {
            common: { getStarted: "ଆରମ୍ଭ କରନ୍ତୁ", signIn: "ଲଗ୍ ଇନ୍", signOut: "ସାଇନ୍ ଆଉଟ୍", loading: "ଲୋଡ୍ ହେଉଛି...", back: "ପଛକୁ", upload: "ଅପଲୋଡ୍", reports: "ରିପୋର୍ଟ", patient: "ରୋଗୀ", doctor: "ଡାକ୍ତର", save: "ସେଭ୍", cancel: "ବାତିଲ", delete: "ଡିଲିଟ୍", error: "ତ୍ରୁଟି", success: "ସଫଳତା", items: "ଆଇଟମ୍", parameters: "ପାରାମିଟର", edit: "ସକ୍ପାଦନ" },
            navbar: { reports: "ରିପୋର୍ଟ", upload: "ଅପଲୋଡ୍", signOut: "ସାଇନ୍ ଆଉଟ୍" },
            landing: { badge: "ମେଡିକାଲ୍ ଇଣ୍ଟରପ୍ରିଟେସନ୍ ପ୍ଲାଟଫର୍ମ", title: "ଆପଣଙ୍କ ଲ୍ୟାବ୍ ଫଳାଫଳ ସ୍ପଷ୍ଟତା ସହ ବୁଝନ୍ତୁ", description: "MEDCLARE ଜଟିଳ ଡାକ୍ତରୀ ରିପୋର୍ଟଗୁଡ଼ିକୁ ସ୍ପଷ୍ଟ ବ୍ୟାଖ୍ୟାରେ ପରିଣତ କରେ.", feature1Title: "ସଂରଚିତ ବିଶ୍ଳେଷଣ", feature1Desc: "ପ୍ରତ୍ୟେକ ଫଳାଫଳ ସଂଗ୍ରହ କରାଯାଇ ରେଫରେନ୍ସ ସୀମା ସହ ତୁଳନା କରାଯାଏ.", feature2Title: "ପ୍ରମାଣ ଆଧାରିତ", feature2Desc: "ବ୍ୟାଖ୍ୟାଗୁଡ଼ିକ କ୍ଲିନିକାଲ ପ୍ରମାଣ ଆଧାରରେ ତିଆରି.", feature3Title: "ଡାକ୍ତର ଯାଞ୍ଚ କରିଛନ୍ତି", feature3Desc: "ପ୍ରତ୍ୟେକ ବ୍ୟାଖ୍ୟା ବୃତ୍ତିଗତ ଯାଞ୍ଚ ପାଇଥାଏ.", confidence: "ବିଶ୍ୱାସ ସ୍କୋରିଂ", citations: "ଉଦ୍ଧୃତି ଟ୍ରାକିଂ", safety: "ସୁରକ୍ଷା ମାନଦଣ୍ଡ", personalized: "ବ୍ୟକ୍ତିଗତ" },
            auth: { welcomeBack: "ପୁଣି ସ୍ୱାଗତ", signInSubtitle: "ଆପଣଙ୍କ ରିପୋର୍ଟ ଦେଖିବା ପାଇଁ ଲଗ୍ ଇନ୍ କରନ୍ତୁ", createAccount: "ଆପଣଙ୍କ ଆକାଉଣ୍ଟ ତିଆରି କରନ୍ତୁ", registerSubtitle: "ଆପଣଙ୍କ ଡାକ୍ତରୀ ରିପୋର୍ଟ ବୁଝିବା ଆରମ୍ଭ କରନ୍ତୁ", fullName: "ସମ୍ପୂର୍ଣ୍ଣ ନାମ", email: "ଇମେଲ୍", password: "ପାସୱାର୍ଡ", passwordHint: "ଅତିକମରେ ୬ଟି ଅକ୍ଷର", roleLabel: "ମୁଁ ଜଣେ", noAccount: "ଆକାଉଣ୍ଟ ନାହିଁ?", haveAccount: "ଆଗରୁ ଆକାଉଣ୍ଟ ଅଛି?", createOne: "ଗୋଟିଏ ତିଆରି କରନ୍ତୁ", signInLink: "ଲଗ୍ ଇନ୍" },
            dashboard: { title: "ମୋର ରିପୋର୍ଟ", doctorTitle: "ରୋଗୀ ରିପୋର୍ଟ", subtitle: "ଆପଣଙ୍କ ଡାକ୍ତରୀ ରିପୋର୍ଟ ବ୍ୟାଖ୍ୟା ଟ୍ରାକ୍ କରନ୍ତୁ", doctorSubtitle: "ରୋଗୀ ରିପୋର୍ଟ ସମୀକ୍ଷା କରନ୍ତୁ", uploadBtn: "ରିପୋର୍ଟ ଅପଲୋଡ୍", total: "ମୋଟ ରିପୋର୍ଟ", verified: "ଯାଞ୍ଚିତ", pending: "ସମୀକ୍ଷା ବାକି", processing: "ପ୍ରକ୍ରିୟାକରଣ", noReports: "ଏ ପର୍ଯ୍ୟନ୍ତ କୌଣସି ରିପୋର୍ଟ ନାହିଁ", uploadFirst: "ଆପଣଙ୍କ ପ୍ରଥମ ଡାକ୍ତରୀ ରିପୋର୍ଟ ଅପଲୋଡ୍ କରନ୍ତୁ" },
            upload: { title: "ଡାକ୍ତରୀ ରିପୋର୍ଟ ଅପଲୋଡ୍", subtitle: "AI ବ୍ୟାଖ୍ୟା ପାଇଁ ରକ୍ତ ପରୀକ୍ଷା ଅପଲୋଡ୍ କରନ୍ତୁ", dropzone: "ଆପଣଙ୍କ ରିପୋର୍ଟ ଏଠାରେ ଛାଡନ୍ତୁ", orClick: "ବ୍ରାଉଜ୍ କରିବାକୁ କ୍ଲିକ୍ କରନ୍ତୁ", formatHint: "PDF, PNG, JPG, TIFF", reportTitle: "ରିପୋର୍ଟ ଶୀର୍ଷକ", detailLevel: "ବ୍ୟାଖ୍ୟା ବିସ୍ତାର ସ୍ତର", levels: { simple: "ସରଳ — ବୁଝିବା ସହଜ", standard: "ମାନକ — ଡାକ୍ତରୀ ସନ୍ଦର୍ଭ ସହ ସ୍ପଷ୍ଟ", detailed: "ବିସ୍ତୃତ — କ୍ଲିନିକାଲ ଗଭୀରତା" }, analyzeBtn: "ରିପୋର୍ଟ ବିଶ୍ଳେଷଣ କରନ୍ତୁ", processingTitle: "ଆପଣଙ୍କ ରିପୋର୍ଟ ପ୍ରକ୍ରିୟା ହେଉଛି", pipeline: { upload: "ରିପୋର୍ଟ ଅପଲୋଡ୍ ହେଉଛି", ocr: "ଅପ୍ଟିକାଲ୍ କ୍ୟାରେକ୍ଟର ରେକଗ୍ନିସନ", extract: "ସଂରଚିତ ଫଳାଫଳ ସଂଗ୍ରହ", retrieve: "ଡାକ୍ତରୀ ପ୍ରମାଣ ସଂଗ୍ରହ", explain: "ବ୍ୟାଖ୍ୟା ତିଆରି", guardrail: "ସୁରକ୍ଷା ଯାଞ୍ଚ", personalize: "ବ୍ୟକ୍ତିଗତକରଣ", complete: "ବ୍ୟାଖ୍ୟା ସମ୍ପୂର୍ଣ୍ଣ" } },
            report: {
                backToReports: "ରିପୋର୍ଟକୁ ଫେରନ୍ତୁ", date: "ତାରିଖ", findings: "ସଂରଚିତ ଫଳାଫଳ", medications: "ନିର୍ଦ୍ଧାରିତ ଔଷଧ", explanation: "ବ୍ୟାଖ୍ୟା", confidence: "ବିଶ୍ୱାସ ମୂଲ୍ୟାଙ୍କନ",
                categories: {
                    general: "ସାଧାରଣ",
                    hematology: "ହେମାଟୋଲୋଜି",
                    biochemistry: "ବାୟୋକେମିଷ୍ଟ୍ରି",
                    thyroid: "ଥାଇରଏଡ୍ କାର୍ଯ୍ୟ",
                    vitamin: "ଭିଟାମିନ୍",
                    diabetes: "ଡାଇବେଟିସ୍ ମାର୍କର୍ସ",
                    liver: "ଲିଭର କାର୍ଯ୍ୟ",
                    kidney: "କିଡନୀ କାର୍ଯ୍ୟ",
                    lipid: "ଲିପିଡ୍ ପ୍ରୋଫାଇଲ୍"
                },
                tabs: { findings: "ସଂରଚିତ ଫଳାଫଳ", medications: "ନିର୍ଦ୍ଧାରିତ ଔଷଧ", explanation: "ବ୍ୟାଖ୍ୟା" }, table: { parameter: "ପାରାମିଟର", value: "ମୂଲ୍ୟ", range: "ସନ୍ଦର୍ଭ ସୀମା", status: "ସ୍ଥିତି" }, status: { normal: "ସାଧାରଣ", high: "ଉଚ୍ଚ", low: "ନିମ୍ନ", critical: "ଗମ୍ଭୀର", abnormal: "ଅସାଧାରଣ ଫଳାଫଳ" }, dosage: "ଡୋଜ୍", frequency: "ବାରମ୍ବାରତା", duration: "ଅବଧି", instructions: "ନିର୍ଦ୍ଦେଶ", sourcesCitations: "ଉତ୍ସ ଓ ଉଦ୍ଧୃତି", confidenceAssessment: "ବିଶ୍ୱାସ ମୂଲ୍ୟାଙ୍କନ", confidenceDesc: "ସମସ୍ତ ପାଇପଲାଇନ ସ୍ତରର ସମଗ୍ର ବିଶ୍ୱାସ", "confidence": { high: "ଉଚ୍ଚ ବିଶ୍ୱାସ", moderate: "ମଧ୍ୟମ ବିଶ୍ୱାସ", low: "ନିମ୍ନ ବିଶ୍ୱାସ" }, doctorVerified: "ଡାକ୍ତର ଯାଞ୍ଚ କରିଛନ୍ତି", pendingVerification: "ଯାଞ୍ଚ ବାକି", needsRevision: "ସଂଶୋଧନ ଆବଶ୍ୟକ", verifiedOn: "ଯାଞ୍ଚ ତାରିଖ", pendingDesc: "ଏହି ବ୍ୟାଖ୍ୟା ବୃତ୍ତିଗତ ସମୀକ୍ଷା ପାଇଁ ଅପେକ୍ଷା କରୁଛି", rejectedDesc: "ଜଣେ ସ୍ୱାସ୍ଥ୍ୟ ବୃତ୍ତିକର୍ମୀ ପରିବର୍ତ୍ତନ ଅନୁରୋଧ କରିଛନ୍ତି", trustSafety: "ବିଶ୍ୱାସ ଓ ସୁରକ୍ଷା", disclaimerTitle: "ଡାକ୍ତରୀ ଅସ୍ୱୀକୃତି", disclaimerDesc: "ଏହି ବ୍ୟାଖ୍ୟା AI ଦ୍ୱାରା ତିଆରି ଏବଂ କେବଳ ସୂଚନାତ୍ମକ ଉଦ୍ଦେଶ୍ୟ ପାଇଁ.", versions: "ସଂସ୍କରଣ", version: "ସଂସ୍କରଣ", original: "ମୂଳ", edited: "ସମ୍ପାଦିତ", noExplanation: "ଏ ପର୍ଯ୍ୟନ୍ତ ବ୍ୟାଖ୍ୟା ନାହିଁ.", verificationActions: "ଯାଞ୍ଚ କାର୍ଯ୍ୟ", doctorNotes: "ଡାକ୍ତର ନୋଟ୍ସ", notesPlaceholder: "ରୋଗୀ ପାଇଁ ନୋଟ୍ସ ଯୋଡନ୍ତୁ...", approveBtn: "ଅନୁମୋଦନ", rejectBtn: "ପ୍ରତ୍ୟାଖ୍ୟାନ", verification: { verified: "ଡାକ୍ତର ଯାଞ୍ଚ କରିଛନ୍ତି", pending: "ଯାଞ୍ଚ ବାକି", rejected: "ସଂଶୋଧନ ଆବଶ୍ୟକ", verifiedOn: "ଯାଞ୍ଚ ତାରିଖ", awaiting: "ଏହି ବ୍ୟାଖ୍ୟା ବୃତ୍ତିଗତ ସମୀକ୍ଷା ପାଇଁ ଅପେକ୍ଷା କରୁଛି", requestedChanges: "ଜଣେ ସ୍ୱାସ୍ଥ୍ୟ ବୃତ୍ତିକର୍ମୀ ପରିବର୍ତ୍ତନ ଅନୁରୋଧ କରିଛନ୍ତି" }, safety: "ସୁରକ୍ଷା ସଙ୍କେତ", disclaimer: { title: "ଡାକ୍ତରୀ ଅସ୍ୱୀକୃତି", text: "ଏହି ବ୍ୟାଖ୍ୟା AI ଦ୍ୱାରା ତିଆରି ଏବଂ କେବଳ ସୂଚନାତ୍ମକ ଉଦ୍ଦେଶ୍ୟ ପାଇଁ।" }
            }
        }
    },
    ml: {
        translation: {
            common: { getStarted: "ആരംഭിക്കുക", signIn: "സൈൻ ഇൻ", signOut: "സൈൻ ഔട്ട്", loading: "ലോഡ് ചെയ്യുന്നു...", back: "പുറകോട്ട്", upload: "അപ്‌ലോഡ്", reports: "റിപ്പോർട്ടുകൾ", patient: "രോഗി", doctor: "ഡോക്ടർ", save: "സേവ്", cancel: "റദ്ദാക്കുക", delete: "ഇല്ലാതാക്കുക", error: "പിശക്", success: "വിജയം", items: "ഇനങ്ങൾ", parameters: "പാരാമീറ്ററുകൾ", edit: "എഡിറ്റ്" },
            navbar: { reports: "റിപ്പോർട്ടുകൾ", upload: "അപ്‌ലോഡ്", signOut: "സൈൻ ഔട്ട്" },
            landing: { badge: "മെഡിക്കൽ ഇന്റർപ്രെറ്റേഷൻ പ്ലാറ്റ്ഫോം", title: "നിങ്ങളുടെ ലാബ് ഫലങ്ങൾ വ്യക്തതയോടെ മനസ്സിലാക്കുക", description: "MEDCLARE സങ്കീർണ്ണ മെഡിക്കൽ റിപ്പോർട്ടുകളെ വ്യക്തമായ വിശദീകരണങ്ങളാക്കി മാറ്റുന്നു.", feature1Title: "ഘടനാപരമായ വിശകലനം", feature1Desc: "ഓരോ ഫലവും ശേഖരിക്കുകയും റഫറൻസ് ശ്രേണികളുമായി താരതമ്യം ചെയ്യുകയും ചെയ്യുന്നു.", feature2Title: "തെളിവ് അടിസ്ഥാനമാക്കിയത്", feature2Desc: "വിശദീകരണങ്ങൾ ക്ലിനിക്കൽ തെളിവുകളുടെ അടിസ്ഥാനത്തിൽ.", feature3Title: "ഡോക്ടർ പരിശോധിച്ചു", feature3Desc: "ഓരോ വിശദീകരണവും പ്രൊഫഷണൽ പരിശോധന നേടുന്നു.", confidence: "ആത്മവിശ്വാസ സ്കോറിംഗ്", citations: "ഉദ്ധരണി ട്രാക്കിംഗ്", safety: "സുരക്ഷാ മാനദണ്ഡങ്ങൾ", personalized: "വ്യക്തിഗതമാക്കിയത്" },
            auth: { welcomeBack: "തിരിച്ചു സ്വാഗതം", signInSubtitle: "നിങ്ങളുടെ റിപ്പോർട്ടുകൾ കാണാൻ സൈൻ ഇൻ ചെയ്യുക", createAccount: "നിങ്ങളുടെ അക്കൗണ്ട് സൃഷ്ടിക്കുക", registerSubtitle: "നിങ്ങളുടെ മെഡിക്കൽ റിപ്പോർട്ടുകൾ മനസ്സിലാക്കാൻ ആരംഭിക്കുക", fullName: "പൂർണ്ണ പേര്", email: "ഇമെയിൽ", password: "പാസ്‌വേഡ്", passwordHint: "കുറഞ്ഞത് 6 അക്ഷരങ്ങൾ", roleLabel: "ഞാൻ ഒരു", noAccount: "അക്കൗണ്ട് ഇല്ലേ?", haveAccount: "ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?", createOne: "ഒന്ന് സൃഷ്ടിക്കുക", signInLink: "സൈൻ ഇൻ" },
            dashboard: { title: "എന്റെ റിപ്പോർട്ടുകൾ", doctorTitle: "രോഗി റിപ്പോർട്ടുകൾ", subtitle: "നിങ്ങളുടെ മെഡിക്കൽ റിപ്പോർട്ട് വിശദീകരണങ്ങൾ ട്രാക്ക് ചെയ്യുക", doctorSubtitle: "രോഗി റിപ്പോർട്ടുകൾ അവലോകനം ചെയ്യുക", uploadBtn: "റിപ്പോർട്ട് അപ്‌ലോഡ്", total: "ആകെ റിപ്പോർട്ടുകൾ", verified: "പരിശോധിച്ചു", pending: "അവലോകനം തീർപ്പാക്കാത്തത്", processing: "പ്രോസസ്സിംഗ്", noReports: "ഇതുവരെ റിപ്പോർട്ടുകൾ ഇല്ല", uploadFirst: "നിങ്ങളുടെ ആദ്യ മെഡിക്കൽ റിപ്പോർട്ട് അപ്‌ലോഡ് ചെയ്യുക" },
            upload: { title: "മെഡിക്കൽ റിപ്പോർട്ട് അപ്‌ലോഡ്", subtitle: "AI വിശദീകരണത്തിന് രക്ത പരിശോധന അപ്‌ലോഡ് ചെയ്യുക", dropzone: "നിങ്ങളുടെ റിപ്പോർട്ട് ഇവിടെ ഇടുക", orClick: "ബ്രൗസ് ചെയ്യാൻ ക്ലിക്ക് ചെയ്യുക", formatHint: "PDF, PNG, JPG, TIFF", reportTitle: "റിപ്പോർട്ട് ശീർഷകം", detailLevel: "വിശദീകരണ വിശദാംശ നില", levels: { simple: "ലളിതം — മനസ്സിലാക്കാൻ എളുപ്പം", standard: "സ്റ്റാൻഡേർഡ് — മെഡിക്കൽ സന്ദർഭത്തോടെ", detailed: "വിശദമായ — ക്ലിനിക്കൽ ഡെപ്ത്" }, analyzeBtn: "റിപ്പോർട്ട് വിശകലനം ചെയ്യുക", processingTitle: "നിങ്ങളുടെ റിപ്പോർട്ട് പ്രോസസ് ചെയ്യുന്നു", pipeline: { upload: "റിപ്പോർട്ട് അപ്‌ലോഡ്", ocr: "ഒപ്റ്റിക്കൽ ക്യാരക്ടർ റെക്കഗ്നിഷൻ", extract: "ഘടനാപരമായ ഫലങ്ങൾ എക്സ്ട്രാക്റ്റ് ചെയ്യൽ", retrieve: "മെഡിക്കൽ തെളിവുകൾ ശേഖരിക്കൽ", explain: "വിശദീകരണം സൃഷ്ടിക്കൽ", guardrail: "സുരക്ഷാ പരിശോധനകൾ", personalize: "വ്യക്തിഗതമാക്കൽ", complete: "വിശദീകരണം പൂർത്തിയായി" } },
            report: {
                backToReports: "റിപ്പോർട്ടുകളിലേക്ക് മടങ്ങുക",
                date: "തീയതി",
                findings: "ഘടനാപരമായ ഫലങ്ങൾ",
                medications: "നിർദ്ദേശിച്ച മരുന്നുകൾ",
                explanation: "വിശദീകരണം",
                confidence: "ആത്മവിശ്വാസ മൂല്യനിർണ്ണയം",
                categories: {
                    general: "പൊതുവായവ",
                    hematology: "ഹെമറ്റോളജി",
                    biochemistry: "ബയോകെമിസ്ട്രി",
                    thyroid: "തൈറോയ്ഡ് പ്രവർത്തനം",
                    vitamin: "വിറ്റാമിനുകൾ",
                    diabetes: "പ്രമേഹ സൂചകങ്ങൾ",
                    liver: "കരൾ പ്രവർത്തനം",
                    kidney: "വൃക്ക പ്രവർത്തനം",
                    lipid: "ലിപിഡ് പ്രൊഫൈൽ"
                },
                tabs: { findings: "ഘടനാപരമായ ഫലങ്ങൾ", medications: "നിർദ്ദേശിച്ച മരുന്നുകൾ", explanation: "വിശദീകരണം" }, table: { parameter: "പാരാമീറ്റർ", value: "മൂല്യം", range: "റഫറൻസ് ശ്രേണി", status: "നില" }, status: { normal: "സാധാരണം", high: "ഉയർന്നത്", low: "താഴ്ന്നത്", critical: "ഗുരുതരം", abnormal: "അസാധാരണ ഫലങ്ങൾ" }, dosage: "ഡോസേജ്", frequency: "ആവൃത്തി", duration: "കാലാവധി", instructions: "നിർദ്ദേശങ്ങൾ", sourcesCitations: "ഉറവിടങ്ങൾ & ഉദ്ധരണികൾ", confidenceAssessment: "ആത്മവിശ്വാസ മൂല്യനിർണ്ണയം", confidenceDesc: "എല്ലാ ഘട്ടങ്ങളുടെയും ആകെ ആത്മവിശ്വാസം", "confidence": { high: "ഉയർന്ന ആത്മവിശ്വാസം", moderate: "മിതമായ ആത്മവിശ്വാസം", low: "കുറഞ്ഞ ആത്മവിശ്വാസം" }, doctorVerified: "ഡോക്ടർ പരിശോധിച്ചു", pendingVerification: "പരിശോധന തീർപ്പാക്കാത്തത്", needsRevision: "പുനഃപരിശോധന ആവശ്യം", verifiedOn: "പരിശോധിച്ച തീയതി", pendingDesc: "ഈ വിശദീകരണം പ്രൊഫഷണൽ അവലോകനത്തിനായി കാത്തിരിക്കുന്നു", rejectedDesc: "ഒരു ആരോഗ്യ വിദഗ്ധൻ മാറ്റങ്ങൾ അഭ്യർത്ഥിച്ചു", trustSafety: "വിശ്വാസം & സുരക്ഷ", disclaimerTitle: "മെഡിക്കൽ നിരാകരണം", disclaimerDesc: "ഈ വിശദീകരണം AI സിസ്റ്റത്താൽ സൃഷ്ടിച്ചതാണ്, വിവര ആവശ്യങ്ങൾക്ക് മാത്രം.", versions: "പതിപ്പുകൾ", version: "പതിപ്പ്", original: "യഥാർത്ഥം", edited: "എഡിറ്റ് ചെയ്തത്", noExplanation: "ഇതുവരെ വിശദീകരണം ഇല്ല.", verificationActions: "പരിശോധന പ്രവർത്തനങ്ങൾ", doctorNotes: "ഡോക്ടർ കുറിപ്പുകൾ", notesPlaceholder: "രോഗിക്ക് കുറിപ്പുകൾ ചേർക്കുക...", approveBtn: "അംഗീകരിക്കുക", rejectBtn: "നിരസിക്കുക", verification: { verified: "ഡോക്ടർ പരിശോധിച്ചു", pending: "പരിശോധന തീർപ്പാക്കാത്തത്", rejected: "പുനഃപരിശോധന ആവശ്യം", verifiedOn: "പരിശോധിച്ച തീയതി", awaiting: "ഈ വിശദീകരണം പ്രൊഫഷണൽ അവലോകനത്തിനായി കാത്തിരിക്കുന്നു", requestedChanges: "ഒരു ആരോഗ്യ വിദഗ്ധൻ മാറ്റങ്ങൾ അഭ്യർത്ഥിച്ചു" }, safety: "സുരക്ഷാ സൂചകങ്ങൾ", disclaimer: { title: "മെഡിക്കൽ നിരാകരണം", text: "ഈ വിശദീകരണം AI സിസ്റ്റത്താൽ സൃഷ്ടിച്ചതാണ്, വിവര ആവശ്യങ്ങൾക്ക് മാത്രം।" }
            }
        }
    },
    bn: {
        translation: {
            common: { getStarted: "শুরু করুন", signIn: "লগ ইন", signOut: "সাইন আউট", loading: "লোড হচ্ছে...", back: "পিছনে", upload: "আপলোড", reports: "রিপোর্ট", patient: "রোগী", doctor: "ডাক্তার", save: "সংরক্ষণ", cancel: "বাতিল", delete: "মুছুন", error: "ত্রুটি", success: "সফলতা", items: "আইটেম", parameters: "প্যারামিটার", edit: "সম্পাদনা" },
            navbar: { reports: "রিপোর্ট", upload: "আপলোড", signOut: "সাইন আউট" },
            landing: { badge: "মেডিক্যাল ইন্টারপ্রেটেশন প্ল্যাটফর্ম", title: "আপনার ল্যাব ফলাফল স্পষ্টতার সাথে বুঝুন", description: "MEDCLARE জটিল চিকিৎসা প্রতিবেদনকে স্পষ্ট ব্যাখ্যায় রূপান্তরিত করে.", feature1Title: "কাঠামোগত বিশ্লেষণ", feature1Desc: "প্রতিটি ফলাফল সংগ্রহ করা হয় এবং রেফারেন্স রেঞ্জের সাথে তুলনা করা হয়.", feature2Title: "প্রমাণ ভিত্তিক", feature2Desc: "ব্যাখ্যাগুলি ক্লিনিক্যাল প্রমাণের উপর ভিত্তি করে.", feature3Title: "ডাক্তার যাচাই করেছেন", feature3Desc: "প্রতিটি ব্যাখ্যা পেশাদার যাচাই পায়.", confidence: "আত্মবিশ্বাস স্কোরিং", citations: "উদ্ধৃতি ট্র্যাকিং", safety: "নিরাপত্তা মানদণ্ড", personalized: "ব্যক্তিগতকৃত" },
            auth: { welcomeBack: "আবার স্বাগতম", signInSubtitle: "আপনার রিপোর্ট দেখতে লগ ইন করুন", createAccount: "আপনার অ্যাকাউন্ট তৈরি করুন", registerSubtitle: "আপনার চিকিৎসা রিপোর্ট বুঝতে শুরু করুন", fullName: "পূর্ণ নাম", email: "ইমেইল", password: "পাসওয়ার্ড", passwordHint: "কমপক্ষে ৬টি অক্ষর", roleLabel: "আমি একজন", noAccount: "অ্যাকাউন্ট নেই?", haveAccount: "ইতিমধ্যে অ্যাকাউন্ট আছে?", createOne: "একটি তৈরি করুন", signInLink: "লগ ইন" },
            dashboard: { title: "আমার রিপোর্ট", doctorTitle: "রোগীর রিপোর্ট", subtitle: "আপনার চিকিৎসা রিপোর্ট ব্যাখ্যা ট্র্যাক করুন", doctorSubtitle: "রোগীর রিপোর্ট পর্যালোচনা করুন", uploadBtn: "রিপোর্ট আপলোড", total: "মোট রিপোর্ট", verified: "যাচাই করা হয়েছে", pending: "পর্যালোচনা মুলতুবি", processing: "প্রক্রিয়াকরণ", noReports: "এখনো কোনো রিপোর্ট নেই", uploadFirst: "আপনার প্রথম চিকিৎসা রিপোর্ট আপলোড করুন" },
            upload: { title: "চিকিৎসা রিপোর্ট আপলোড", subtitle: "AI ব্যাখ্যার জন্য রক্ত পরীক্ষা আপলোড করুন", dropzone: "আপনার রিপোর্ট এখানে ছাড়ুন", orClick: "ব্রাউজ করতে ক্লিক করুন", formatHint: "PDF, PNG, JPG, TIFF", reportTitle: "রিপোর্ট শিরোনাম", detailLevel: "ব্যাখ্যা বিস্তারিত স্তর", levels: { simple: "সরল — বুঝতে সহজ", standard: "মানক — চিকিৎসা প্রসঙ্গ সহ স্পষ্ট", detailed: "বিস্তারিত — ক্লিনিক্যাল গভীরতা" }, analyzeBtn: "রিপোর্ট বিশ্লেষণ করুন", processingTitle: "আপনার রিপোর্ট প্রক্রিয়া হচ্ছে", pipeline: { upload: "রিপোর্ট আপলোড হচ্ছে", ocr: "অপটিক্যাল ক্যারেক্টার রিকগনিশন", extract: "কাঠামোগত ফলাফল সংগ্রহ", retrieve: "চিকিৎসা প্রমাণ সংগ্রহ", explain: "ব্যাখ্যা তৈরি", guardrail: "নিরাপত্তা পরীক্ষা", personalize: "ব্যক্তিগতকরণ", complete: "ব্যাখ্যা সম্পূর্ণ" } },
            report: { backToReports: "রিপোর্টে ফিরে যান", date: "তারিখ", findings: "কাঠামোগত ফলাফল", medications: "নির্ধারিত ওষুধ", explanation: "ব্যাখ্যা", confidence: "আত্মবিশ্বাস মূল্যায়ন", tabs: { findings: "কাঠামোগত ফলাফল", medications: "নির্ধারিত ওষুধ", explanation: "ব্যাখ্যা" }, table: { parameter: "প্যারামিটার", value: "মান", range: "রেফারেন্স রেঞ্জ", status: "অবস্থা" }, status: { normal: "স্বাভাবিক", high: "উচ্চ", low: "নিম্ন", critical: "গুরুতর", abnormal: "অস্বাভাবিক ফলাফল" }, dosage: "ডোজ", frequency: "পুনরাবৃত্তি", duration: "সময়কাল", instructions: "নির্দেশনা", sourcesCitations: "উৎস ও উদ্ধৃতি", confidenceAssessment: "আত্মবিশ্বাস মূল্যায়ন", confidenceDesc: "সমস্ত পাইপলাইন পর্যায়ে সামগ্রিক আত্মবিশ্বাস", "confidence": { high: "উচ্চ আত্মবিশ্বাস", moderate: "মধ্যম আত্মবিশ্বাস", low: "নিম্ন আত্মবিশ্বাস" }, doctorVerified: "ডাক্তার যাচাই করেছেন", pendingVerification: "যাচাই মুলতুবি", needsRevision: "সংশোধন প্রয়োজন", verifiedOn: "যাচাইয়ের তারিখ", pendingDesc: "এই ব্যাখ্যা পেশাদার পর্যালোচনার জন্য অপেক্ষা করছে", rejectedDesc: "একজন স্বাস্থ্য পেশাদার পরিবর্তনের অনুরোধ করেছেন", trustSafety: "বিশ্বাস ও নিরাপত্তা", disclaimerTitle: "চিকিৎসা দাবিত্যাগ", disclaimerDesc: "এই ব্যাখ্যা AI সিস্টেম দ্বারা তৈরি এবং শুধুমাত্র তথ্যের জন্য.", versions: "সংস্করণ", version: "সংস্করণ", original: "মূল", edited: "সম্পাদিত", noExplanation: "এখনও কোনো ব্যাখ্যা নেই.", verificationActions: "যাচাই কার্যক্রম", doctorNotes: "ডাক্তার নোটস", notesPlaceholder: "রোগীর জন্য নোটস যোগ করুন...", approveBtn: "অনুমোদন", rejectBtn: "প্রত্যাখ্যান", verification: { verified: "ডাক্তার যাচাই করেছেন", pending: "যাচাই মুলতুবি", rejected: "সংশোধন প্রয়োজন", verifiedOn: "যাচাইয়ের তারিখ", awaiting: "এই ব্যাখ্যা পেশাদার পর্যালোচনার জন্য অপেক্ষা করছে", requestedChanges: "একজন স্বাস্থ্য পেশাদার পরিবর্তনের অনুরোধ করেছেন" }, safety: "নিরাপত্তা সংকেত", disclaimer: { title: "চিকিৎসা দাবিত্যাগ", text: "এই ব্যাখ্যা AI সিস্টেম দ্বারা তৈরি এবং শুধুমাত্র তথ্যের জন্য." } }
        }
    },
    pa: {
        translation: {
            common: { getStarted: "ਸ਼ੁਰੂ ਕਰੋ", signIn: "ਲੌਗ ਇਨ", signOut: "ਸਾਈਨ ਆਊਟ", loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...", back: "ਪਿੱਛੇ", upload: "ਅਪਲੋਡ", reports: "ਰਿਪੋਰਟਾਂ", patient: "ਮਰੀਜ਼", doctor: "ਡਾਕਟਰ", save: "ਸੇਵ", cancel: "ਰੱਦ", delete: "ਮਿਟਾਓ", error: "ਗਲਤੀ", success: "ਸਫਲਤਾ", items: "ਆਈਟਮ", parameters: "ਪੈਰਾਮੀਟਰ", edit: "ਸੰਪਾਦਨ" },
            navbar: { reports: "ਰਿਪੋਰਟਾਂ", upload: "ਅਪਲੋਡ", signOut: "ਸਾਈਨ ਆਊਟ" },
            landing: { badge: "ਮੈਡੀਕਲ ਇੰਟਰਪ੍ਰੀਟੇਸ਼ਨ ਪਲੈਟਫਾਰਮ", title: "ਆਪਣੇ ਲੈਬ ਨਤੀਜਿਆਂ ਨੂੰ ਸਪੱਸ਼ਟਤਾ ਨਾਲ ਸਮਝੋ", description: "MEDCLARE ਗੁੰਝਲਦਾਰ ਮੈਡੀਕਲ ਰਿਪੋਰਟਾਂ ਨੂੰ ਸਪੱਸ਼ਟ ਵਿਆਖਿਆਵਾਂ ਵਿੱਚ ਬਦਲਦਾ ਹੈ.", feature1Title: "ਢਾਂਚਾਗਤ ਵਿਸ਼ਲੇਸ਼ਣ", feature1Desc: "ਹਰ ਨਤੀਜਾ ਇਕੱਠਾ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਅਤੇ ਹਵਾਲਾ ਸੀਮਾਵਾਂ ਨਾਲ ਤੁਲਨਾ ਕੀਤੀ ਜਾਂਦੀ ਹੈ.", feature2Title: "ਸਬੂਤ ਅਧਾਰਤ", feature2Desc: "ਵਿਆਖਿਆਵਾਂ ਕਲੀਨਿਕਲ ਸਬੂਤ ਦੇ ਅਧਾਰ 'ਤੇ.", feature3Title: "ਡਾਕਟਰ ਤਸਦੀਕ ਕੀਤਾ", feature3Desc: "ਹਰ ਵਿਆਖਿਆ ਪੇਸ਼ੇਵਰ ਤਸਦੀਕ ਪ੍ਰਾਪਤ ਕਰਦੀ ਹੈ.", confidence: "ਭਰੋਸੇ ਦੀ ਸਕੋਰਿੰਗ", citations: "ਹਵਾਲਾ ਟ੍ਰੈਕਿੰਗ", safety: "ਸੁਰੱਖਿਆ ਮਿਆਰ", personalized: "ਵਿਅਕਤੀਗਤ" },
            auth: { welcomeBack: "ਫਿਰ ਜੀ ਆਇਆਂ ਨੂੰ", signInSubtitle: "ਆਪਣੀਆਂ ਰਿਪੋਰਟਾਂ ਦੇਖਣ ਲਈ ਲੌਗ ਇਨ ਕਰੋ", createAccount: "ਆਪਣਾ ਖਾਤਾ ਬਣਾਓ", registerSubtitle: "ਆਪਣੀਆਂ ਮੈਡੀਕਲ ਰਿਪੋਰਟਾਂ ਸਮਝਣਾ ਸ਼ੁਰੂ ਕਰੋ", fullName: "ਪੂਰਾ ਨਾਮ", email: "ਈਮੇਲ", password: "ਪਾਸਵਰਡ", passwordHint: "ਘੱਟੋ ਘੱਟ 6 ਅੱਖਰ", roleLabel: "ਮੈਂ ਇੱਕ", noAccount: "ਖਾਤਾ ਨਹੀਂ?", haveAccount: "ਪਹਿਲਾਂ ਤੋਂ ਖਾਤਾ ਹੈ?", createOne: "ਇੱਕ ਬਣਾਓ", signInLink: "ਲੌਗ ਇਨ" },
            dashboard: { title: "ਮੇਰੀਆਂ ਰਿਪੋਰਟਾਂ", doctorTitle: "ਮਰੀਜ਼ ਰਿਪੋਰਟਾਂ", subtitle: "ਆਪਣੀਆਂ ਮੈਡੀਕਲ ਰਿਪੋਰਟ ਵਿਆਖਿਆਵਾਂ ਟ੍ਰੈਕ ਕਰੋ", doctorSubtitle: "ਮਰੀਜ਼ ਰਿਪੋਰਟਾਂ ਦੀ ਸਮੀਖਿਆ ਕਰੋ", uploadBtn: "ਰਿਪੋਰਟ ਅਪਲੋਡ", total: "ਕੁੱਲ ਰਿਪੋਰਟਾਂ", verified: "ਤਸਦੀਕ ਕੀਤਾ", pending: "ਸਮੀਖਿਆ ਬਕਾਇਆ", processing: "ਪ੍ਰੋਸੈਸ ਹੋ ਰਿਹਾ ਹੈ", noReports: "ਅਜੇ ਕੋਈ ਰਿਪੋਰਟ ਨਹੀਂ", uploadFirst: "ਆਪਣੀ ਪਹਿਲੀ ਮੈਡੀਕਲ ਰਿਪੋਰਟ ਅਪਲੋਡ ਕਰੋ" },
            upload: { title: "ਮੈਡੀਕਲ ਰਿਪੋਰਟ ਅਪਲੋਡ", subtitle: "AI ਵਿਆਖਿਆ ਲਈ ਖੂਨ ਦੀ ਜਾਂਚ ਅਪਲੋਡ ਕਰੋ", dropzone: "ਆਪਣੀ ਰਿਪੋਰਟ ਇੱਥੇ ਛੱਡੋ", orClick: "ਬ੍ਰਾਊਜ਼ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ", formatHint: "PDF, PNG, JPG, TIFF", reportTitle: "ਰਿਪੋਰਟ ਸਿਰਲੇਖ", detailLevel: "ਵਿਆਖਿਆ ਵੇਰਵੇ ਦਾ ਪੱਧਰ", levels: { simple: "ਸਰਲ — ਸਮਝਣ ਵਿੱਚ ਆਸਾਨ", standard: "ਮਿਆਰੀ — ਮੈਡੀਕਲ ਸੰਦਰਭ ਨਾਲ ਸਪੱਸ਼ਟ", detailed: "ਵਿਸਤ੍ਰਿਤ — ਕਲੀਨਿਕਲ ਡੂੰਘਾਈ" }, analyzeBtn: "ਰਿਪੋਰਟ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ", processingTitle: "ਤੁਹਾਡੀ ਰਿਪੋਰਟ ਪ੍ਰੋਸੈਸ ਹੋ ਰਹੀ ਹੈ", pipeline: { upload: "ਰਿਪੋਰਟ ਅਪਲੋਡ ਹੋ ਰਹੀ ਹੈ", ocr: "ਆਪਟੀਕਲ ਕੈਰੇਕਟਰ ਰੀਕੋਗਨੀਸ਼ਨ", extract: "ਢਾਂਚਾਗਤ ਨਤੀਜੇ ਕੱਢਣਾ", retrieve: "ਮੈਡੀਕਲ ਸਬੂਤ ਪ੍ਰਾਪਤ ਕਰਨਾ", explain: "ਵਿਆਖਿਆ ਤਿਆਰ ਕਰਨਾ", guardrail: "ਸੁਰੱਖਿਆ ਜਾਂਚ", personalize: "ਵਿਅਕਤੀਗਤਕਰਨ", complete: "ਵਿਆਖਿਆ ਪੂਰੀ ਹੋਈ" } },
            report: { backToReports: "ਰਿਪੋਰਟਾਂ 'ਤੇ ਵਾਪਸ", date: "ਤਾਰੀਖ", findings: "ਢਾਂਚਾਗਤ ਨਤੀਜੇ", medications: "ਤਜਵੀਜ਼ ਕੀਤੀਆਂ ਦਵਾਈਆਂ", explanation: "ਵਿਆਖਿਆ", confidence: "ਭਰੋਸਾ ਮੁਲਾਂਕਣ", tabs: { findings: "ਢਾਂਚਾਗਤ ਨਤੀਜੇ", medications: "ਤਜਵੀਜ਼ ਕੀਤੀਆਂ ਦਵਾਈਆਂ", explanation: "ਵਿਆਖਿਆ" }, table: { parameter: "ਪੈਰਾਮੀਟਰ", value: "ਮੁੱਲ", range: "ਹਵਾਲਾ ਸੀਮਾ", status: "ਸਥਿਤੀ" }, status: { normal: "ਸਧਾਰਨ", high: "ਉੱਚ", low: "ਘੱਟ", critical: "ਗੰਭੀਰ", abnormal: "ਅਸਧਾਰਨ ਨਤੀਜੇ" }, dosage: "ਖੁਰਾਕ", frequency: "ਵਾਰਵਾਰਤਾ", duration: "ਮਿਆਦ", instructions: "ਹਿਦਾਇਤਾਂ", sourcesCitations: "ਸਰੋਤ ਅਤੇ ਹਵਾਲੇ", confidenceAssessment: "ਭਰੋਸਾ ਮੁਲਾਂਕਣ", confidenceDesc: "ਸਾਰੇ ਪਾਈਪਲਾਈਨ ਪੜਾਵਾਂ ਦਾ ਸਮੁੱਚਾ ਭਰੋਸਾ", "confidence": { high: "ਉੱਚ ਭਰੋਸਾ", moderate: "ਮੱਧਮ ਭਰੋਸਾ", low: "ਘੱਟ ਭਰੋਸਾ" }, doctorVerified: "ਡਾਕਟਰ ਤਸਦੀਕ ਕੀਤਾ", pendingVerification: "ਤਸਦੀਕ ਬਕਾਇਆ", needsRevision: "ਸੋਧ ਲੋੜੀਂਦੀ", verifiedOn: "ਤਸਦੀਕ ਤਾਰੀਖ", pendingDesc: "ਇਹ ਵਿਆਖਿਆ ਪੇਸ਼ੇਵਰ ਸਮੀਖਿਆ ਦੀ ਉਡੀਕ ਕਰ ਰਹੀ ਹੈ", rejectedDesc: "ਇੱਕ ਸਿਹਤ ਪੇਸ਼ੇਵਰ ਨੇ ਬਦਲਾਅ ਦੀ ਬੇਨਤੀ ਕੀਤੀ ਹੈ", trustSafety: "ਭਰੋਸਾ ਅਤੇ ਸੁਰੱਖਿਆ", disclaimerTitle: "ਮੈਡੀਕਲ ਬੇਦਾਅਵਾ", disclaimerDesc: "ਇਹ ਵਿਆਖਿਆ AI ਸਿਸਟਮ ਦੁਆਰਾ ਤਿਆਰ ਕੀਤੀ ਗਈ ਹੈ, ਸਿਰਫ ਜਾਣਕਾਰੀ ਲਈ.", versions: "ਸੰਸਕਰਣ", version: "ਸੰਸਕਰਣ", original: "ਮੂਲ", edited: "ਸੰਪਾਦਿਤ", noExplanation: "ਅਜੇ ਕੋਈ ਵਿਆਖਿਆ ਨਹੀਂ.", verificationActions: "ਤਸਦੀਕ ਕਾਰਵਾਈਆਂ", doctorNotes: "ਡਾਕਟਰ ਨੋਟਸ", notesPlaceholder: "ਮਰੀਜ਼ ਲਈ ਨੋਟਸ ਜੋੜੋ...", approveBtn: "ਮਨਜ਼ੂਰ", rejectBtn: "ਰੱਦ ਕਰੋ", verification: { verified: "ਡਾਕਟਰ ਤਸਦੀਕ ਕੀਤਾ", pending: "ਤਸਦੀਕ ਬਕਾਇਆ", rejected: "ਸੋਧ ਲੋੜੀਂਦੀ", verifiedOn: "ਤਸਦੀਕ ਤਾਰੀਖ", awaiting: "ਇਹ ਵਿਆਖਿਆ ਪੇਸ਼ੇਵਰ ਸਮੀਖਿਆ ਦੀ ਉਡੀਕ ਕਰ ਰਹੀ ਹੈ", requestedChanges: "ਇੱਕ ਸਿਹਤ ਪੇਸ਼ੇਵਰ ਨੇ ਬਦਲਾਅ ਦੀ ਬੇਨਤੀ ਕੀਤੀ ਹੈ" }, safety: "ਸੁਰੱਖਿਆ ਸੰਕੇਤ", disclaimer: { title: "ਮੈਡੀਕਲ ਬੇਦਾਅਵਾ", text: "ਇਹ ਵਿਆਖਿਆ AI ਸਿਸਟਮ ਦੁਆਰਾ ਤਿਆਰ ਕੀਤੀ ਗਈ ਹੈ, ਸਿਰਫ ਜਾਣਕਾਰੀ ਲਈ." } }
        }
    },
    mr: {
        translation: {
            common: { getStarted: "सुरू करा", signIn: "लॉग इन", signOut: "साइन आउट", loading: "लोड होत आहे...", back: "मागे", upload: "अपलोड", reports: "रिपोर्ट्स", patient: "रुग्ण", doctor: "डॉक्टर", save: "जतन करा", cancel: "रद्द करा", delete: "हटवा", error: "त्रुटी", success: "यशस्वी", items: "वस्तू", parameters: "पॅरामीटर", edit: "संपादन" },
            navbar: { reports: "रिपोर्ट्स", upload: "अपलोड", signOut: "साइन आउट" },
            landing: { badge: "वैद्यकीय व्याख्या प्लॅटफॉर्म", title: "तुमचे लॅब निकाल स्पष्टतेने समजून घ्या", description: "MEDCLARE गुंतागुंतीच्या वैद्यकीय अहवालांचे स्पष्ट स्पष्टीकरणात रूपांतर करते.", feature1Title: "संरचित विश्लेषण", feature1Desc: "प्रत्येक निष्कर्ष गोळा केला जातो आणि संदर्भ श्रेणींशी तुलना केली जाते.", feature2Title: "पुरावा आधारित", feature2Desc: "स्पष्टीकरणे वैद्यकीय पुराव्यांवर आधारित.", feature3Title: "डॉक्टरांनी सत्यापित", feature3Desc: "प्रत्येक स्पष्टीकरण व्यावसायिक सत्यापन प्राप्त करते.", confidence: "आत्मविश्वास स्कोरिंग", citations: "उद्धरण ट्रॅकिंग", safety: "सुरक्षा मानदंड", personalized: "वैयक्तिकृत" },
            auth: { welcomeBack: "पुन्हा स्वागत", signInSubtitle: "तुमचे अहवाल पाहण्यासाठी लॉग इन करा", createAccount: "तुमचे खाते तयार करा", registerSubtitle: "तुमचे वैद्यकीय अहवाल समजून घेणे सुरू करा", fullName: "पूर्ण नाव", email: "ईमेल", password: "पासवर्ड", passwordHint: "किमान 6 अक्षरे", roleLabel: "मी एक", noAccount: "खाते नाही?", haveAccount: "आधीच खाते आहे?", createOne: "एक तयार करा", signInLink: "लॉग इन" },
            dashboard: { title: "माझे अहवाल", doctorTitle: "रुग्ण अहवाल", subtitle: "तुमच्या वैद्यकीय अहवाल स्पष्टीकरणांचा मागोवा घ्या", doctorSubtitle: "रुग्ण अहवालांचे पुनरावलोकन करा", uploadBtn: "अहवाल अपलोड", total: "एकूण अहवाल", verified: "सत्यापित", pending: "पुनरावलोकन प्रलंबित", processing: "प्रक्रिया सुरू", noReports: "अजून कोणताही अहवाल नाही", uploadFirst: "तुमचा पहिला वैद्यकीय अहवाल अपलोड करा" },
            upload: { title: "वैद्यकीय अहवाल अपलोड", subtitle: "AI स्पष्टीकरणासाठी रक्त तपासणी अपलोड करा", dropzone: "तुमचा अहवाल इथे टाका", orClick: "ब्राउझ करण्यासाठी क्लिक करा", formatHint: "PDF, PNG, JPG, TIFF", reportTitle: "अहवाल शीर्षक", detailLevel: "स्पष्टीकरण तपशील पातळी", levels: { simple: "सोपे — समजायला सोपे", standard: "मानक — वैद्यकीय संदर्भासह स्पष्ट", detailed: "तपशीलवार — वैद्यकीय सखोलता" }, analyzeBtn: "अहवालाचे विश्लेषण करा", processingTitle: "तुमच्या अहवालावर प्रक्रिया होत आहे", pipeline: { upload: "अहवाल अपलोड होत आहे", ocr: "ऑप्टिकल कॅरेक्टर रिकॉग्निशन", extract: "संरचित निष्कर्ष काढणे", retrieve: "वैद्यकीय पुरावे मिळवणे", explain: "स्पष्टीकरण तयार करणे", guardrail: "सुरक्षा तपासणी", personalize: "वैयक्तिकरण", complete: "स्पष्टीकरण पूर्ण" } },
            report: { backToReports: "अहवालांवर परत", date: "तारीख", findings: "संरचित निष्कर्ष", medications: "निर्धारित औषधे", explanation: "स्पष्टीकरण", confidence: "आत्मविश्वास मूल्यांकन", tabs: { findings: "संरचित निष्कर्ष", medications: "निर्धारित औषधे", explanation: "स्पष्टीकरण" }, table: { parameter: "पॅरामीटर", value: "मूल्य", range: "संदर्भ श्रेणी", status: "स्थिती" }, status: { normal: "सामान्य", high: "उच्च", low: "कमी", critical: "गंभीर", abnormal: "असामान्य निष्कर्ष" }, dosage: "डोस", frequency: "वारंवारता", duration: "कालावधी", instructions: "सूचना", sourcesCitations: "स्रोत आणि उद्धरणे", confidenceAssessment: "आत्मविश्वास मूल्यांकन", confidenceDesc: "सर्व पाइपलाइन टप्प्यांचा एकूण आत्मविश्वास", "confidence": { high: "उच्च आत्मविश्वास", moderate: "मध्यम आत्मविश्वास", low: "कमी आत्मविश्वास" }, doctorVerified: "डॉक्टरांनी सत्यापित", pendingVerification: "सत्यापन प्रलंबित", needsRevision: "सुधारणा आवश्यक", verifiedOn: "सत्यापित तारीख", pendingDesc: "हे स्पष्टीकरण व्यावसायिक पुनरावलोकनाची वाट पाहत आहे", rejectedDesc: "एका आरोग्य व्यावसायिकाने बदल विनंती केली आहे", trustSafety: "विश्वास आणि सुरक्षा", disclaimerTitle: "वैद्यकीय अस्वीकरण", disclaimerDesc: "हे स्पष्टीकरण AI प्रणालीद्वारे तयार केले गेले आहे, केवळ माहितीच्या उद्देशाने.", versions: "आवृत्त्या", version: "आवृत्ती", original: "मूळ", edited: "संपादित", noExplanation: "अजून स्पष्टीकरण नाही.", verificationActions: "सत्यापन कृती", doctorNotes: "डॉक्टर नोट्स", notesPlaceholder: "रुग्णांसाठी नोट्स जोडा...", approveBtn: "मान्य करा", rejectBtn: "नाकारा", verification: { verified: "डॉक्टरांनी सत्यापित", pending: "सत्यापन प्रलंबित", rejected: "सुधारणा आवश्यक", verifiedOn: "सत्यापित तारीख", awaiting: "हे स्पष्टीकरण व्यावसायिक पुनरावलोकनाची वाट पाहत आहे", requestedChanges: "एका आरोग्य व्यावसायिकाने बदल विनंती केली आहे" }, safety: "सुरक्षा संकेत", disclaimer: { title: "वैद्यकीय अस्वीकरण", text: "हे स्पष्टीकरण AI प्रणालीद्वारे तयार केले गेले आहे, केवळ माहितीच्या उद्देशाने." } }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        }
    });

export default i18n;
