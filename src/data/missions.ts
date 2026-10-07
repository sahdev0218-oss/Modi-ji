import { Mission } from '../types/game';

export const MISSIONS_DATA: Mission[] = [
  {
    id: 1,
    code: "DEL-01",
    titleEn: "Swachh Bharat Clean-Up Drive",
    titleHi: "स्वच्छ भारत सफाई अभियान",
    taglineEn: "Clear plastic litter around Kartavya Path in New Delhi",
    taglineHi: "नई दिल्ली के कर्तव्य पथ पर प्लास्टिक कचरा एकत्र कर स्वच्छता फैलाएं",
    location: "Kartavya Path, Delhi",
    state: "Delhi",
    type: "clean",
    difficulty: 1,
    requiredStars: 0,
    rewardCoins: 100,
    rewardXp: 150,
    rewardStars: 3,
    environmentTheme: "delhi",
    objectives: [
      {
        id: "obj1",
        descriptionEn: "Collect 5 discarded plastic bottles & cans",
        descriptionHi: "5 फेंकी गई प्लास्टिक की बोतलें और कचरा उठाएं",
        required: 5,
        current: 0,
        type: "collect_trash"
      },
      {
        id: "obj2",
        descriptionEn: "Greet 2 volunteer sanitation workers with Namaste",
        descriptionHi: "2 स्वच्छता मित्रों को 'नमस्ते' बोलकर प्रोत्साहित करें",
        required: 2,
        current: 0,
        type: "talk_citizen"
      }
    ],
    educationalFactEn: "The Swachh Bharat Mission launched on 2 October 2014 has inspired over 100 million household toilets and nationwide citizen cleanliness drives.",
    educationalFactHi: "2 अक्टूबर 2014 को प्रारंभ हुए स्वच्छ भारत मिशन ने देश भर में 10 करोड़ से अधिक शौचालयों और जन-भागीदारी से स्वच्छता क्रांति को गति दी।"
  },
  {
    id: 2,
    code: "GUJ-02",
    titleEn: "Sabarmati Harit Green Plantation",
    titleHi: "साबरमती हरित वृक्षारोपण",
    taglineEn: "Plant indigenous banyan and neem saplings along the riverfront",
    taglineHi: "साबरमती रिवरफ्रंट पर नीम और पीपल के फलदायी पौधे लगाएं",
    location: "Sabarmati Riverfront, Ahmedabad",
    state: "Gujarat",
    type: "plant",
    difficulty: 1,
    requiredStars: 2,
    rewardCoins: 120,
    rewardXp: 180,
    rewardStars: 3,
    environmentTheme: "gujarat",
    objectives: [
      {
        id: "obj1",
        descriptionEn: "Plant 4 native green saplings in prepared soil",
        descriptionHi: "तैयार मिट्टी में 4 स्थानीय औषधीय पौधे रोपें",
        required: 4,
        current: 0,
        type: "plant_tree"
      },
      {
        id: "obj2",
        descriptionEn: "Deposit 3 dry leaves bags in composting stations",
        descriptionHi: "3 खाद बैग जैविक खाद केंद्र में जमा करें",
        required: 3,
        current: 0,
        type: "collect_trash"
      }
    ],
    educationalFactEn: "Neem and Peepal trees produce significant daytime oxygen and naturally purify atmospheric particulate matter.",
    educationalFactHi: "नीम और पीपल के वृक्ष प्रचुर मात्रा में ऑक्सीजन प्रदान करते हैं और वायु प्रदूषण को प्राकृतिक रूप से नियंत्रित करते हैं।"
  },
  {
    id: 3,
    code: "VAR-03",
    titleEn: "Smart School Digital Quest",
    titleHi: "स्मार्ट स्कूल डिजिटल ज्ञान परीक्षा",
    taglineEn: "Visit an interactive public school in Varanasi and answer educational quiz",
    taglineHi: "वाराणसी के प्राथमिक स्मार्ट विद्यालय का भ्रमण कर छात्रों के साथ ज्ञान क्विज़ हल करें",
    location: "Kashi Smart School, Varanasi",
    state: "Uttar Pradesh",
    type: "quiz",
    difficulty: 2,
    requiredStars: 4,
    rewardCoins: 150,
    rewardXp: 220,
    rewardStars: 3,
    environmentTheme: "varanasi",
    objectives: [
      {
        id: "obj1",
        descriptionEn: "Complete the 3-question India Educational Quiz",
        descriptionHi: "3 प्रश्नों की भारत ज्ञान प्रश्नोत्तरी पूरी करें",
        required: 3,
        current: 0,
        type: "complete_quiz"
      },
      {
        id: "obj2",
        descriptionEn: "Encourage 2 young students preparing for exams",
        descriptionHi: "परीक्षा की तैयारी कर रहे 2 विद्यार्थियों का उत्साहवर्धन करें",
        required: 2,
        current: 0,
        type: "talk_citizen"
      }
    ],
    quizQuestions: [
      {
        id: "q1",
        questionEn: "Which sacred river flows through the ancient cultural city of Varanasi?",
        questionHi: "प्राचीन सांस्कृतिक नगरी वाराणसी से होकर कौन सी पवित्र नदी बहती है?",
        optionsEn: ["Yamuna", "Ganga", "Godavari", "Narmada"],
        optionsHi: ["यमुना", "गंगा", "गोदावरी", "नर्मदा"],
        correctIndex: 1,
        explanationEn: "The holy river Ganga flows gracefully through Varanasi along renowned ghats.",
        explanationHi: "पवित्र गंगा नदी वाराणसी के ऐतिहासिक और सुंदर घाटों से होकर बहती है।"
      },
      {
        id: "q2",
        questionEn: "What is India's national tree, known for its vast spreading canopy?",
        questionHi: "भारत का राष्ट्रीय वृक्ष कौन सा है, जिसकी शाखाएं विशाल छत्र बनाती हैं?",
        optionsEn: ["Banyan (Vatavriksha)", "Mango", "Teak", "Eucalyptus"],
        optionsHi: ["बरगद (वटवृक्ष)", "आम", "सागौन", "सफेदा"],
        correctIndex: 0,
        explanationEn: "The Banyan tree (Ficus benghalensis) symbolizes longevity and national unity.",
        explanationHi: "बरगद का वृक्ष अमरता और दृढ़ता का प्रतीक माना जाता है।"
      },
      {
        id: "q3",
        questionEn: "What does the 24-spoke Ashoka Chakra in the Indian Flag represent?",
        questionHi: "भारतीय राष्ट्रीय ध्वज में स्थित 24 तीलियों वाला अशोक चक्र क्या दर्शाता है?",
        optionsEn: ["24 Seasons", "Wheel of Righteousness & 24 Hours of Progress", "24 Rivers", "24 States"],
        optionsHi: ["24 ऋतुएं", "धर्म चक्र और निरंतर प्रगति के 24 घंटे", "24 नदियां", "24 राज्य"],
        correctIndex: 1,
        explanationEn: "The Ashoka Chakra signifies dharma, righteousness, and continuous dynamic motion.",
        explanationHi: "अशोक चक्र धर्म, न्याय और 24 घंटे निरंतर प्रगतिशील रहने का प्रतीक है।"
      }
    ],
    educationalFactEn: "Varanasi (Kashi) is celebrated as one of the world's oldest continually inhabited cultural and educational centers.",
    educationalFactHi: "वाराणसी विश्व के सबसे प्राचीन और जीवंत ज्ञान व सांस्कृतिक केंद्रों में से एक है।"
  },
  {
    id: 4,
    code: "DEL-04",
    titleEn: "Red Fort Heritage Preservation",
    titleHi: "लाल किला धरोहर संरक्षण अभियान",
    taglineEn: "Inspect historic pathways and clear encroaching weeds around Delhi's iconic monument",
    taglineHi: "दिल्ली के ऐतिहासिक लाल किले की प्राचीर के पास स्वच्छता और संरक्षण कार्य करें",
    location: "Red Fort, Old Delhi",
    state: "Delhi",
    type: "heritage",
    difficulty: 2,
    requiredStars: 6,
    rewardCoins: 160,
    rewardXp: 240,
    rewardStars: 3,
    environmentTheme: "delhi",
    objectives: [
      {
        id: "obj1",
        descriptionEn: "Clear 4 weed and debris patches near the stone ramparts",
        descriptionHi: "पत्थर की दीवारों के पास से 4 खरपतवार व कचरा हटाएं",
        required: 4,
        current: 0,
        type: "collect_trash"
      },
      {
        id: "obj2",
        descriptionEn: "Guide 2 tourist families toward the heritage information board",
        descriptionHi: "2 पर्यटक परिवारों को धरोहर सूचना पट्ट की ओर मार्गदर्शन करें",
        required: 2,
        current: 0,
        type: "talk_citizen"
      }
    ],
    educationalFactEn: "The Red Fort was commissioned by Emperor Shah Jahan in 1638 and is a UNESCO World Heritage Site symbolizing Indian independence.",
    educationalFactHi: "लाल किला यूनेस्को विश्व धरोहर स्थल है और भारत के स्वतंत्रता दिवस पर तिरंगा फहराने का गौरवशाली केंद्र है।"
  },
  {
    id: 5,
    code: "MUM-05",
    titleEn: "Marine Drive Coastal Segregation",
    titleHi: "मरीन ड्राइव समुद्री अपशिष्ट पृथक्करण",
    taglineEn: "Collect and sort beach plastics near Gateway of India in Mumbai",
    taglineHi: "मुंबई के गेटवे ऑफ इंडिया व समुद्र तट पर प्लास्टिक कचरे का वैज्ञानिक पृथक्करण करें",
    location: "Gateway of India, Mumbai",
    state: "Maharashtra",
    type: "recycle",
    difficulty: 2,
    requiredStars: 8,
    rewardCoins: 180,
    rewardXp: 260,
    rewardStars: 3,
    environmentTheme: "mumbai",
    objectives: [
      {
        id: "obj1",
        descriptionEn: "Segregate 6 recyclable bottles and packaging into blue bins",
        descriptionHi: "6 रिसाइकल योग्य प्लास्टिक बोतलों को नीले कूड़ेदान में डालें",
        required: 6,
        current: 0,
        type: "collect_trash"
      },
      {
        id: "obj2",
        descriptionEn: "Educate 3 coastal visitors on zero-single-use plastics",
        descriptionHi: "3 तटीय सैलानियों को एकल-उपयोग प्लास्टिक न प्रयोग करने हेतु प्रेरित करें",
        required: 3,
        current: 0,
        type: "talk_citizen"
      }
    ],
    educationalFactEn: "Segregating wet waste from dry recyclables reduces landfill accumulation by up to 70% and protects marine biodiversity.",
    educationalFactHi: "गीले और सूखे कचरे को अलग रखने से 70% तक कचरा पुनर्चक्रित हो सकता है और समुद्री जीवों की रक्षा होती है।"
  },
  {
    id: 6,
    code: "RAJ-06",
    titleEn: "Desert Solar Village Lighting",
    titleHi: "थार मरुस्थल सौर ऊर्जा ज्योति अभियान",
    taglineEn: "Distribute and activate solar lamps for rural green energy transition",
    taglineHi: "राजस्थान के ग्रामीण अंचल में सौर ऊर्जा प्रकाश लैंप सक्रिय करें",
    location: "Jaipur Solar Hub, Rajasthan",
    state: "Rajasthan",
    type: "solar",
    difficulty: 3,
    requiredStars: 10,
    rewardCoins: 200,
    rewardXp: 300,
    rewardStars: 3,
    environmentTheme: "rajasthan",
    objectives: [
      {
        id: "obj1",
        descriptionEn: "Activate 4 standalone clean solar streetlight pillars",
        descriptionHi: "4 सौर ऊर्जा संचालित प्रकाश स्तंभ सक्रिय करें",
        required: 4,
        current: 0,
        type: "activate_solar"
      },
      {
        id: "obj2",
        descriptionEn: "Assist 2 village craftspeople with clean solar energy kiosks",
        descriptionHi: "2 हस्तशिल्पियों को सौर ऊर्जा केंद्र के लाभ समझाएं",
        required: 2,
        current: 0,
        type: "talk_citizen"
      }
    ],
    educationalFactEn: "Bhadla Solar Park in Rajasthan is one of the world's largest solar installations spanning over 14,000 acres.",
    educationalFactHi: "राजस्थान का भड़ला सोलर पार्क विश्व के सबसे विशाल सौर ऊर्जा संयंत्रों में से एक है।"
  },
  {
    id: 7,
    code: "KOL-07",
    titleEn: "Ayushman Community Health Aid",
    titleHi: "आयुष्मान आरोग्य जन-सेवा",
    taglineEn: "Guide elderly and needy citizens to the nearest public wellness center",
    taglineHi: "कोलकाता में वरिष्ठ नागरिकों को निःशुल्क स्वास्थ्य परामर्श केंद्र तक सुरक्षित पहुंचाएं",
    location: "Howrah Heritage Square, Kolkata",
    state: "West Bengal",
    type: "guide",
    difficulty: 3,
    requiredStars: 12,
    rewardCoins: 210,
    rewardXp: 320,
    rewardStars: 3,
    environmentTheme: "kolkata",
    objectives: [
      {
        id: "obj1",
        descriptionEn: "Guide 3 citizens safely to the Ayushman health camp checkpoint",
        descriptionHi: "3 नागरिकों को स्वास्थ्य जांच केंद्र तक सुरक्षित पहुंचाएं",
        required: 3,
        current: 0,
        type: "guide_citizen"
      },
      {
        id: "obj2",
        descriptionEn: "Clear 3 obstructions from the pedestrian walkway",
        descriptionHi: "पैदल पथ से 3 बाधाएं व कचरा हटाएं",
        required: 3,
        current: 0,
        type: "collect_trash"
      }
    ],
    educationalFactEn: "Ayushman Bharat PM-JAY is one of the world's largest public health assurance initiatives covering over 500 million beneficiaries.",
    educationalFactHi: "आयुष्मान भारत योजना विश्व की सबसे बड़ी स्वास्थ्य सुरक्षा योजनाओं में से एक है जो 50 करोड़ से अधिक लोगों को सुरक्षा देती है।"
  },
  {
    id: 8,
    code: "CHE-08",
    titleEn: "Fit India Morning Walkathon",
    titleHi: "फिट इंडिया प्रभात पदयात्रा",
    taglineEn: "Organize hydration spots and inspire citizens on Marina Beach",
    taglineHi: "चेन्नई के मरीना बीच पर फिटनेस और योग जागरूकता फैलाएं",
    location: "Marina Coastline, Chennai",
    state: "Tamil Nadu",
    type: "community",
    difficulty: 3,
    requiredStars: 15,
    rewardCoins: 220,
    rewardXp: 340,
    rewardStars: 3,
    environmentTheme: "chennai",
    objectives: [
      {
        id: "obj1",
        descriptionEn: "Check in at 4 community fitness trail checkpoints",
        descriptionHi: "4 फिटनेस व पदयात्रा चेकपॉइंट्स पर पहुंचे",
        required: 4,
        current: 0,
        type: "activate_solar"
      },
      {
        id: "obj2",
        descriptionEn: "Share wellness encouragement with 3 morning walkers",
        descriptionHi: "3 प्रातःकालीन नागरिकों को योग व स्वास्थ्य का संदेश दें",
        required: 3,
        current: 0,
        type: "talk_citizen"
      }
    ],
    educationalFactEn: "Marina Beach in Chennai is India's longest natural urban beach spanning roughly 12 kilometers along the Bay of Bengal.",
    educationalFactHi: "चेन्नई का मरीना बीच लगभग 12 किमी लंबा भारत का सबसे लंबा प्राकृतिक शहरी समुद्र तट है।"
  },
  {
    id: 9,
    code: "HYD-09",
    titleEn: "Skill India Youth Tech Expo",
    titleHi: "स्किल इंडिया युवा नवाचार संगम",
    taglineEn: "Support young innovators showcasing robotics and solar engineering",
    taglineHi: "हैदराबाद के चारमीनार क्षेत्र में युवा छात्रों के विज्ञान व नवाचार प्रोजेक्ट्स को प्रोत्साहित करें",
    location: "Charminar Tech Zone, Hyderabad",
    state: "Telangana",
    type: "community",
    difficulty: 3,
    requiredStars: 18,
    rewardCoins: 230,
    rewardXp: 360,
    rewardStars: 3,
    environmentTheme: "hyderabad",
    objectives: [
      {
        id: "obj1",
        descriptionEn: "Visit and approve 4 student STEM innovation booths",
        descriptionHi: "4 युवा वैज्ञानिकों के विज्ञान स्टॉल का दौरा कर अनुमोदन दें",
        required: 4,
        current: 0,
        type: "talk_citizen"
      },
      {
        id: "obj2",
        descriptionEn: "Sort 4 electrical component packaging boxes",
        descriptionHi: "4 इलेक्ट्रॉनिक पैकेजिंग गत्ते रीसायकल बॉक्स में रखें",
        required: 4,
        current: 0,
        type: "collect_trash"
      }
    ],
    educationalFactEn: "Hyderabad and Bengaluru together host India's foremost technology incubators, producing hundreds of world-class green and deep-tech startups.",
    educationalFactHi: "हैदराबाद और बेंगलुरु भारत के प्रमुख सूचना प्रौद्योगिकी और नवप्रवर्तन के विश्वस्तरीय केंद्र हैं।"
  },
  {
    id: 10,
    code: "BLR-10",
    titleEn: "Green Bengaluru Urban Forest",
    titleHi: "हरित बेंगलुरु नगर वन रोपण",
    taglineEn: "Plant indigenous shaded saplings in the silicon capital garden park",
    taglineHi: "बेंगलुरु के सार्वजनिक उद्यान में 5 छायादार एवं फलदार पौधे लगाएं",
    location: "Cubbon Eco Park, Bengaluru",
    state: "Karnataka",
    type: "plant",
    difficulty: 3,
    requiredStars: 21,
    rewardCoins: 250,
    rewardXp: 380,
    rewardStars: 3,
    environmentTheme: "bengaluru",
    objectives: [
      {
        id: "obj1",
        descriptionEn: "Plant 5 sandalwood and fruit saplings in tree pits",
        descriptionHi: "5 चंदन व फलदार पौधों को सुसज्जित क्यारियों में रोपें",
        required: 5,
        current: 0,
        type: "plant_tree"
      },
      {
        id: "obj2",
        descriptionEn: "Gather 4 plastic wraps from park walking lanes",
        descriptionHi: "पार्क के रास्तों से 4 प्लास्टिक कचरा एकत्र करें",
        required: 4,
        current: 0,
        type: "collect_trash"
      }
    ],
    educationalFactEn: "Bengaluru is famously termed the 'Garden City' of India, celebrated for historic green canopies like Lalbagh and Cubbon Park.",
    educationalFactHi: "बेंगलुरु को भारत का 'बगीचों का शहर' कहा जाता है, जहां लालबाग और कब्बन पार्क जैसी ऐतिहासिक हरियाली है।"
  },
  {
    id: 11,
    code: "VAR-11",
    titleEn: "Namami Gange River Cleanliness",
    titleHi: "नमामि गंगे घाट स्वच्छता अभियान",
    taglineEn: "Preserve pristine river steps and set up biodegradable disposal stations",
    taglineHi: "काशी के गंगा घाटों पर तैरते कचरे को हटाएं और इको-फ्रेंडली डस्टबिन लगाएं",
    location: "Dashashwamedh Ghat, Varanasi",
    state: "Uttar Pradesh",
    type: "clean",
    difficulty: 4,
    requiredStars: 24,
    rewardCoins: 260,
    rewardXp: 400,
    rewardStars: 3,
    environmentTheme: "varanasi",
    objectives: [
      {
        id: "obj1",
        descriptionEn: "Collect 6 plastic and polythene items from the riverbank steps",
        descriptionHi: "घाट की सीढ़ियों से 6 पॉलीथिन व प्लास्टिक कचरा साफ करें",
        required: 6,
        current: 0,
        type: "collect_trash"
      },
      {
        id: "obj2",
        descriptionEn: "Activate 3 river-safety solar beacons along the promenade",
        descriptionHi: "3 जल सुरक्षा सौर दीप सक्रिय करें",
        required: 3,
        current: 0,
        type: "activate_solar"
      }
    ],
    educationalFactEn: "The Namami Gange programme is an integrated conservation mission to accomplish effective abatement of pollution and rejuvenation of river Ganga.",
    educationalFactHi: "नमामि गंगे कार्यक्रम गंगा नदी के प्रदूषण को रोकने और नदी के पारिस्थितिकी तंत्र के पुनरुद्धार का राष्ट्रीय मिशन है।"
  },
  {
    id: 12,
    code: "RAJ-12",
    titleEn: "Incredible India Heritage Quiz",
    titleHi: "अतुल्य भारत धरोहर एवं भूगोल क्विज़",
    taglineEn: "Answer cultural geography questions in the royal city of Jaipur",
    taglineHi: "गुलाबी नगरी जयपुर में भारतीय इतिहास, भूगोल और संस्कृति प्रश्नोत्तरी हल करें",
    location: "Hawa Mahal Courtyard, Jaipur",
    state: "Rajasthan",
    type: "quiz",
    difficulty: 4,
    requiredStars: 27,
    rewardCoins: 280,
    rewardXp: 420,
    rewardStars: 3,
    environmentTheme: "rajasthan",
    objectives: [
      {
        id: "obj1",
        descriptionEn: "Pass the 3-question Indian Geography & Heritage Quiz",
        descriptionHi: "3 प्रश्नों की भारतीय भूगोल एवं धरोहर परीक्षा उत्तीर्ण करें",
        required: 3,
        current: 0,
        type: "complete_quiz"
      },
      {
        id: "obj2",
        descriptionEn: "Greet 3 heritage artisans and tourists with traditional warmth",
        descriptionHi: "3 पारम्परिक कलाकारों व पर्यटकों को 'खम्मा घणी / नमस्ते' से अभिवादन करें",
        required: 3,
        current: 0,
        type: "talk_citizen"
      }
    ],
    quizQuestions: [
      {
        id: "q4",
        questionEn: "Which monument in Jaipur is famous for its 953 honeycomb windows designed for cool breezes?",
        questionHi: "जयपुर का कौन सा ऐतिहासिक महल अपनी 953 झरोखों वाली अनूठी वास्तुकला हेतु प्रसिद्ध है?",
        optionsEn: ["Hawa Mahal", "Amber Fort", "City Palace", "Jal Mahal"],
        optionsHi: ["हवा महल", "आमेर का किला", "सिटी पैलेस", "जल महल"],
        correctIndex: 0,
        explanationEn: "Hawa Mahal (Palace of Winds) was built in 1799 by Maharaja Sawai Pratap Singh.",
        explanationHi: "हवा महल का निर्माण 1799 में सवाई प्रताप सिंह ने करवाया था, जो अपनी ठंडी हवा देने वाली झरोखों हेतु प्रसिद्ध है।"
      },
      {
        id: "q5",
        questionEn: "What is India's highest mountain peak entirely within Indian territory?",
        questionHi: "पूर्णतः भारतीय सीमा के भीतर स्थित भारत की सबसे ऊंची पर्वत चोटी कौन सी है?",
        optionsEn: ["Kangchenjunga", "Nanda Devi", "Kamet", "Trisul"],
        optionsHi: ["कंचनजंघा", "नंदा देवी", "कामेत", "त्रिशूल"],
        correctIndex: 0,
        explanationEn: "Kangchenjunga (8,586 m) in Sikkim is the highest peak in India and 3rd highest in the world.",
        explanationHi: "सिक्किम में स्थित कंचनजंघा (8,586 मीटर) भारत की सर्वोच्च और विश्व की तीसरी सबसे ऊंची चोटी है।"
      },
      {
        id: "q6",
        questionEn: "Which state of India is known as the 'Land of Five Rivers'?",
        questionHi: "भारत के किस राज्य को 'पांच नदियों की भूमि' कहा जाता है?",
        optionsEn: ["Punjab", "Haryana", "Uttar Pradesh", "Gujarat"],
        optionsHi: ["पंजाब", "हरियाणा", "उत्तर प्रदेश", "गुजरात"],
        correctIndex: 0,
        explanationEn: "Punjab gets its name from Persian 'Panj' (five) and 'Aab' (waters/rivers).",
        explanationHi: "पंजाब का नाम 'पंज' (पांच) और 'आब' (पानी/नदियां) के मेल से बना है।"
      }
    ],
    educationalFactEn: "Jaipur, the Pink City, was designated as a UNESCO World Heritage site in 2019 for its magnificent urban planning and historic architecture.",
    educationalFactHi: "जयपुर को उसके वैज्ञानिक नगर नियोजन और वास्तुकला के लिए 2019 में यूनेस्को विश्व धरोहर घोषित किया गया था।"
  },
  {
    id: 13,
    code: "KAS-13",
    titleEn: "Kashmir Eco-Tourism Harmony",
    titleHi: "कश्मीर पर्यावरण एवं शिकारा स्वच्छता",
    taglineEn: "Preserve Dal Lake shoreline and distribute eco-friendly cloth bags",
    taglineHi: "श्रीनगर में डल झील के किनारे स्वच्छता रखें और कपड़े के थैलियों का वितरण करें",
    location: "Dal Lake Boulevard, Srinagar",
    state: "Jammu and Kashmir",
    type: "clean",
    difficulty: 4,
    requiredStars: 30,
    rewardCoins: 300,
    rewardXp: 450,
    rewardStars: 3,
    environmentTheme: "himalayas",
    objectives: [
      {
        id: "obj1",
        descriptionEn: "Collect 5 discarded plastic wrappers around the boulevard",
        descriptionHi: "डल झील मार्ग से 5 प्लास्टिक रैपर व कचरा एकत्र करें",
        required: 5,
        current: 0,
        type: "collect_trash"
      },
      {
        id: "obj2",
        descriptionEn: "Plant 3 alpine chinar and pine saplings in the nursery",
        descriptionHi: "3 चिनार व देवदार के पौधे रोपण स्थल पर लगाएं",
        required: 3,
        current: 0,
        type: "plant_tree"
      }
    ],
    educationalFactEn: "The Chinar tree (Platanus orientalis) is a grand deciduous tree that turns brilliant golden and fiery crimson during autumn in the Kashmir valley.",
    educationalFactHi: "कश्मीर का चिनार वृक्ष शरद ऋतु में सुनहरे और लाल रंगों से घाटी की शोभा कई गुना बढ़ा देता है।"
  },
  {
    id: 14,
    code: "ASR-14",
    titleEn: "Community Seva & Cleanliness",
    titleHi: "सामुदायिक सेवा एवं जल संरक्षण",
    taglineEn: "Help organize community refreshment lanes in sacred Amritsar",
    taglineHi: "अमृतसर में तीर्थयात्रियों के लिए स्वच्छ पेयजल व स्वच्छता व्यवस्था में सहयोग करें",
    location: "Heritage Street, Amritsar",
    state: "Punjab",
    type: "community",
    difficulty: 4,
    requiredStars: 33,
    rewardCoins: 310,
    rewardXp: 460,
    rewardStars: 3,
    environmentTheme: "delhi",
    objectives: [
      {
        id: "obj1",
        descriptionEn: "Clear 5 fallen paper cups and leaf platters into compost bins",
        descriptionHi: "5 पत्तल व कागज के पात्र जैविक खाद बॉक्स में डालें",
        required: 5,
        current: 0,
        type: "collect_trash"
      },
      {
        id: "obj2",
        descriptionEn: "Greet 3 selfless volunteers with gratitude",
        descriptionHi: "3 सेवाभावी स्वयंसेवकों को ससम्मान नमस्ते कहें",
        required: 3,
        current: 0,
        type: "talk_citizen"
      }
    ],
    educationalFactEn: "The tradition of Langar serves free, nutritious vegetarian meals to hundreds of thousands of people every day regardless of religion or background.",
    educationalFactHi: "लंगर की पवित्र परंपरा में प्रतिदिन जाति, धर्म और वर्ग के भेद बिना लाखों लोगों को निःशुल्क प्रेमपूर्वक भोजन कराया जाता है।"
  },
  {
    id: 15,
    code: "ASM-15",
    titleEn: "Kaziranga Green Corridor Planting",
    titleHi: "काजीरंगा हरित जैव-विविधता गलियारा",
    taglineEn: "Plant native bamboo saplings to safeguard wildlife habitats",
    taglineHi: "असम में वन्यजीवों की रक्षा हेतु 5 बांस और देशी घास के पौधे लगाएं",
    location: "Kaziranga Eco Zone, Assam",
    state: "Assam",
    type: "plant",
    difficulty: 4,
    requiredStars: 36,
    rewardCoins: 320,
    rewardXp: 480,
    rewardStars: 3,
    environmentTheme: "gujarat",
    objectives: [
      {
        id: "obj1",
        descriptionEn: "Plant 5 native bamboo and grassland saplings",
        descriptionHi: "5 बांस एवं देशी घास के पौधे रोपें",
        required: 5,
        current: 0,
        type: "plant_tree"
      },
      {
        id: "obj2",
        descriptionEn: "Collect 4 discarded snack packets along highway border",
        descriptionHi: "वन्यजीव मार्ग के पास से 4 प्लास्टिक पैकेट हटाएं",
        required: 4,
        current: 0,
        type: "collect_trash"
      }
    ],
    educationalFactEn: "Kaziranga National Park in Assam is home to two-thirds of the world's great one-horned rhinoceroses and is a UNESCO World Heritage site.",
    educationalFactHi: "असम का काजीरंगा राष्ट्रीय उद्यान विश्व के दो-तिहाई एक सींग वाले गैंडों का प्राकृतिक आवास है।"
  },
  {
    id: 16,
    code: "GUJ-16",
    titleEn: "Jal Jeevan Clean Water Walk",
    titleHi: "जल जीवन शुद्ध पेयजल निरीक्षण",
    taglineEn: "Inspect community water purification points and educate citizens",
    taglineHi: "केवड़िया एकता नगर में जल जीवन मिशन के स्वच्छ जल केंद्रों की जांच करें",
    location: "Ekta Nagar, Gujarat",
    state: "Gujarat",
    type: "community",
    difficulty: 4,
    requiredStars: 39,
    rewardCoins: 340,
    rewardXp: 500,
    rewardStars: 3,
    environmentTheme: "gujarat",
    objectives: [
      {
        id: "obj1",
        descriptionEn: "Activate 4 clean tap-water distribution points",
        descriptionHi: "4 शुद्ध पेयजल वितरण प्वाइंट्स सक्रिय करें",
        required: 4,
        current: 0,
        type: "activate_solar"
      },
      {
        id: "obj2",
        descriptionEn: "Guide 2 rural women to the water testing kit station",
        descriptionHi: "2 नागरिकों को जल परीक्षण केंद्र तक राह दिखाएं",
        required: 2,
        current: 0,
        type: "guide_citizen"
      }
    ],
    educationalFactEn: "The Jal Jeevan Mission aims to provide safe and adequate drinking water through individual household tap connections to all rural households in India.",
    educationalFactHi: "जल जीवन मिशन का उद्देश्य देश के प्रत्येक ग्रामीण परिवार को 'हर घर नल से जल' पहुंचाना है।"
  },
  {
    id: 17,
    code: "MUM-17",
    titleEn: "Pedestrian Safety & Zebra Drive",
    titleHi: "सड़क सुरक्षा एवं पैदल यात्री सम्मान",
    taglineEn: "Guide students safely across designated pedestrian crosswalks",
    taglineHi: "मुंबई में स्कूल के बच्चों को सुरक्षित जेब्रा क्रॉसिंग पार करवाएं",
    location: "South Mumbai Boulevard",
    state: "Maharashtra",
    type: "guide",
    difficulty: 5,
    requiredStars: 42,
    rewardCoins: 350,
    rewardXp: 520,
    rewardStars: 3,
    environmentTheme: "mumbai",
    objectives: [
      {
        id: "obj1",
        descriptionEn: "Guide 4 students safely across to the school gate",
        descriptionHi: "4 स्कूली छात्रों को सुरक्षित स्कूल गेट तक पहुंचाएं",
        required: 4,
        current: 0,
        type: "guide_citizen"
      },
      {
        id: "obj2",
        descriptionEn: "Pick up 4 sharp road debris and obstacles",
        descriptionHi: "सड़क से 4 नुकीला कचरा व पत्थर हटाएं",
        required: 4,
        current: 0,
        type: "collect_trash"
      }
    ],
    educationalFactEn: "Road safety campaigns remind all drivers that pedestrians have right of way at zebra crossings.",
    educationalFactHi: "सड़क सुरक्षा नियमों के अनुसार जेब्रा क्रॉसिंग पर पैदल यात्रियों का पहला अधिकार होता है।"
  },
  {
    id: 18,
    code: "BLR-18",
    titleEn: "Digital India Cyber Safety Camp",
    titleHi: "डिजिटल इंडिया साइबर साक्षरता शिविर",
    taglineEn: "Deploy 4 digital safety guidance terminals in Bengaluru tech park",
    taglineHi: "बेंगलुरु में 4 डिजिटल सुरक्षा एवं यूपीआई जागरूकता केंद्र सक्रिय करें",
    location: "Electronic City, Bengaluru",
    state: "Karnataka",
    type: "solar",
    difficulty: 5,
    requiredStars: 45,
    rewardCoins: 360,
    rewardXp: 540,
    rewardStars: 3,
    environmentTheme: "bengaluru",
    objectives: [
      {
        id: "obj1",
        descriptionEn: "Activate 4 digital information kiosks",
        descriptionHi: "4 डिजिटल सूचना कियोस्क चालू करें",
        required: 4,
        current: 0,
        type: "activate_solar"
      },
      {
        id: "obj2",
        descriptionEn: "Educate 3 senior citizens on secure UPI pin safety",
        descriptionHi: "3 वरिष्ठ नागरिकों को सुरक्षित डिजिटल भुगतान के नियम बताएं",
        required: 3,
        current: 0,
        type: "talk_citizen"
      }
    ],
    educationalFactEn: "UPI (Unified Payments Interface) processes billions of instant, paperless transactions every month, making India a global fintech pioneer.",
    educationalFactHi: "भारत का यूपीआई तंत्र हर महीने अरबों कैशलेस लेनदेन सुगम बनाता है, जिसने भारत को वैश्विक फिनटेक में अग्रणी बनाया है।"
  },
  {
    id: 19,
    code: "CHE-19",
    titleEn: "Space & Science Heritage Quiz",
    titleHi: "भारतीय अंतरिक्ष विज्ञान एवं खोज क्विज़",
    taglineEn: "Answer questions on Chandrayaan, ISRO and space exploration",
    taglineHi: "इसरो, चंद्रयान और भारतीय विज्ञान के ऐतिहासिक कीर्तिमानों पर क्विज़ हल करें",
    location: "Science City Center, Chennai",
    state: "Tamil Nadu",
    type: "quiz",
    difficulty: 5,
    requiredStars: 48,
    rewardCoins: 380,
    rewardXp: 580,
    rewardStars: 3,
    environmentTheme: "chennai",
    objectives: [
      {
        id: "obj1",
        descriptionEn: "Complete the 3-question National Space & Tech Quiz",
        descriptionHi: "3 प्रश्नों की राष्ट्रीय अंतरिक्ष व विज्ञान प्रश्नोत्तरी हल करें",
        required: 3,
        current: 0,
        type: "complete_quiz"
      },
      {
        id: "obj2",
        descriptionEn: "Salute 3 aspiring young space scientists",
        descriptionHi: "3 युवा विज्ञान शोधार्थियों का उत्साहवर्धन करें",
        required: 3,
        current: 0,
        type: "talk_citizen"
      }
    ],
    quizQuestions: [
      {
        id: "q7",
        questionEn: "On 23 August 2023, India's Chandrayaan-3 achieved historic soft landing near which region of the Moon?",
        questionHi: "23 अगस्त 2023 को चंद्रयान-3 ने चंद्रमा के किस क्षेत्र पर ऐतिहासिक सॉफ्ट लैंडिंग की?",
        optionsEn: ["Lunar South Pole", "Lunar North Pole", "Sea of Tranquility", "Equator"],
        optionsHi: ["चंद्रमा का दक्षिणी ध्रुव (South Pole)", "उत्तरी ध्रुव", "शांति का सागर", "भूमध्य रेखा"],
        correctIndex: 0,
        explanationEn: "India became the first nation to soft-land near the unexplored Lunar South Pole, honored as National Space Day.",
        explanationHi: "भारत चंद्रमा के दक्षिणी ध्रुव के समीप उतरने वाला विश्व का पहला देश बना, जिसे राष्ट्रीय अंतरिक्ष दिवस के रूप में मनाया जाता है।"
      },
      {
        id: "q8",
        questionEn: "What is the name of the rover carried by Chandrayaan-3?",
        questionHi: "चंद्रयान-3 मिशन के साथ गए रोवर का क्या नाम था?",
        optionsEn: ["Pragyan", "Vikram", "Pushpak", "Aditya"],
        optionsHi: ["प्रज्ञान (Pragyan)", "विक्रम", "पुष्पक", "आदित्य"],
        correctIndex: 0,
        explanationEn: "The Pragyan rover rolled onto the lunar surface conducting in-situ chemical analyses.",
        explanationHi: "प्रज्ञान रोवर ने चंद्रमा की धरती पर चलकर रासायनिक तत्वों का विश्लेषण किया।"
      },
      {
        id: "q9",
        questionEn: "Which Indian scientist is fondly remembered as the 'Father of the Indian Space Programme'?",
        questionHi: "भारतीय अंतरिक्ष कार्यक्रम के जनक के रूप में किसे जाना जाता है?",
        optionsEn: ["Dr. Vikram Sarabhai", "Dr. Homi Bhabha", "Dr. A.P.J. Abdul Kalam", "Sir C.V. Raman"],
        optionsHi: ["डॉ. विक्रम साराभाई", "डॉ. होमी भाभा", "डॉ. ए.पी.जे. अब्दुल कलाम", "सर सी.वी. रमन"],
        correctIndex: 0,
        explanationEn: "Dr. Vikram Sarabhai laid the foundations of ISRO and guided India's pioneering space journey.",
        explanationHi: "डॉ. विक्रम साराभाई ने इसरो की नींव रखी और भारत के अंतरिक्ष अन्वेषण को दिशा दी।"
      }
    ],
    educationalFactEn: "National Space Day is celebrated on August 23rd in India to commemorate the touchdown of the Vikram lander with the Pragyan rover on the moon.",
    educationalFactHi: "23 अगस्त को भारत में राष्ट्रीय अंतरिक्ष दिवस के रूप में मनाया जाता है।"
  },
  {
    id: 20,
    code: "DEL-20",
    titleEn: "Grand Viksit Bharat Celebration",
    titleHi: "भव्य विकसित भारत महा-अभियान",
    taglineEn: "Culmination mission: Clean Kartavya Path, plant ceremonial tree, and greet citizens",
    taglineHi: "महा-समापन मिशन: कर्तव्य पथ की सफाई, स्मारक वृक्षारोपण एवं नागरिकों के साथ तिरंगा एकता",
    location: "India Gate & Kartavya Path, New Delhi",
    state: "Delhi",
    type: "heritage",
    difficulty: 5,
    requiredStars: 51,
    rewardCoins: 500,
    rewardXp: 800,
    rewardStars: 3,
    environmentTheme: "delhi",
    objectives: [
      {
        id: "obj1",
        descriptionEn: "Collect 6 litter items around India Gate grand plaza",
        descriptionHi: "इंडिया गेट परिसर से 6 कचरा वस्तुएं स्वच्छ करें",
        required: 6,
        current: 0,
        type: "collect_trash"
      },
      {
        id: "obj2",
        descriptionEn: "Plant the ceremonial 'Ek Ped Maa Ke Naam' sapling",
        descriptionHi: "'एक पेड़ माँ के नाम' पावन संकल्प का पौधा रोपें",
        required: 2,
        current: 0,
        type: "plant_tree"
      },
      {
        id: "obj3",
        descriptionEn: "Greet 5 citizens and community leaders with joyous Namaste",
        descriptionHi: "5 नागरिकों को सप्रेम 'नमस्ते' कहकर एकता का संदेश दें",
        required: 5,
        current: 0,
        type: "talk_citizen"
      }
    ],
    educationalFactEn: "The 'Viksit Bharat 2047' vision represents India's collective commitment to becoming a developed nation marked by sustainability, innovation, and unity.",
    educationalFactHi: "विकसित भारत 2047 का संकल्प देश को आत्मनिर्भर, आधुनिक, पर्यावरण-अनुकूल और सशक्त राष्ट्र बनाने का साझा प्रयास है।"
  }
];

export const MAP_LOCATIONS = [
  { id: "delhi", nameEn: "New Delhi", nameHi: "नई दिल्ली", x: 42, y: 32, starsRequired: 0, landmark: "India Gate & Kartavya Path", state: "Delhi" },
  { id: "varanasi", nameEn: "Varanasi", nameHi: "वाराणसी", x: 58, y: 38, starsRequired: 4, landmark: "Kashi Ghats & Vishwanath", state: "Uttar Pradesh" },
  { id: "gujarat", nameEn: "Gujarat (Ahmedabad/Kevadia)", nameHi: "गुजरात (अहमदाबाद/एकता नगर)", x: 26, y: 47, starsRequired: 2, landmark: "Sabarmati & Statue of Unity", state: "Gujarat" },
  { id: "mumbai", nameEn: "Mumbai", nameHi: "मुंबई", x: 28, y: 62, starsRequired: 8, landmark: "Gateway of India & Marine Drive", state: "Maharashtra" },
  { id: "rajasthan", nameEn: "Jaipur (Rajasthan)", nameHi: "जयपुर (राजस्थान)", x: 33, y: 36, starsRequired: 10, landmark: "Hawa Mahal & Desert Solar", state: "Rajasthan" },
  { id: "kolkata", nameEn: "Kolkata", nameHi: "कोलकाता", x: 74, y: 48, starsRequired: 12, landmark: "Howrah Bridge & Victoria Memorial", state: "West Bengal" },
  { id: "chennai", nameEn: "Chennai", nameHi: "चेन्नई", x: 48, y: 80, starsRequired: 15, landmark: "Marina Beach & Shore Temple", state: "Tamil Nadu" },
  { id: "hyderabad", nameEn: "Hyderabad", nameHi: "हैदराबाद", x: 44, y: 65, starsRequired: 18, landmark: "Charminar & HITEC City", state: "Telangana" },
  { id: "bengaluru", nameEn: "Bengaluru", nameHi: "बेंगलुरु", x: 41, y: 76, starsRequired: 21, landmark: "Cubbon Park & Silicon Hub", state: "Karnataka" },
  { id: "kashmir", nameEn: "Srinagar (Kashmir)", nameHi: "श्रीनगर (कश्मीर)", x: 36, y: 15, starsRequired: 30, landmark: "Dal Lake & Chinar Valleys", state: "Jammu & Kashmir" },
  { id: "amritsar", nameEn: "Amritsar (Punjab)", nameHi: "अमृतसर (पंजाब)", x: 34, y: 24, starsRequired: 33, landmark: "Golden Heritage & Wagah", state: "Punjab" },
  { id: "assam", nameEn: "Kaziranga (Assam)", nameHi: "काजीरंगा (असम)", x: 88, y: 35, starsRequired: 36, landmark: "Brahmaputra & Rhino Reserve", state: "Assam" }
];

export const INITIAL_ACHIEVEMENTS = [
  {
    id: "first_clean",
    titleEn: "Swachh Pioneer",
    titleHi: "स्वच्छता सेनानी",
    descEn: "Collect your first 5 pieces of public litter",
    descHi: "पहला 5 कचरा साफ कर स्वच्छता का संकल्प लें",
    icon: "Sparkles",
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    rewardCoins: 50
  },
  {
    id: "green_champion",
    titleEn: "Green Warrior",
    titleHi: "हरित प्रहरी",
    descEn: "Plant 10 saplings across Indian cities",
    descHi: "देश के विभिन्न शहरों में 10 पौधे लगाएं",
    icon: "TreePine",
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    rewardCoins: 100
  },
  {
    id: "quiz_master",
    titleEn: "Bharat Vidwan",
    titleHi: "भारत विद्वान",
    descEn: "Answer 6 educational quiz questions correctly",
    descHi: "6 ज्ञान प्रश्नोत्तरी के सही उत्तर दें",
    icon: "GraduationCap",
    unlocked: false,
    progress: 0,
    maxProgress: 6,
    rewardCoins: 150
  },
  {
    id: "people_connect",
    titleEn: "Jan Samvad Hero",
    titleHi: "जन संवाद नायक",
    descEn: "Exchange respectful greetings with 15 citizens",
    descHi: "15 नागरिकों से आत्मीय 'नमस्ते' संवाद करें",
    icon: "Users",
    unlocked: false,
    progress: 0,
    maxProgress: 15,
    rewardCoins: 100
  },
  {
    id: "solar_bright",
    titleEn: "Surya Urja Mitra",
    titleHi: "सूर्य ऊर्जा मित्र",
    descEn: "Activate 10 solar energy streetlights",
    descHi: "10 सौर ऊर्जा लाइटें सक्रिय करें",
    icon: "Sun",
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    rewardCoins: 120
  },
  {
    id: "master_diplomat",
    titleEn: "Viksit Bharat Icon",
    titleHi: "विकसित भारत रत्न",
    descEn: "Complete all 20 missions across India",
    descHi: "भारत भर के सभी 20 मिशन सफलतापूर्वक पूर्ण करें",
    icon: "Award",
    unlocked: false,
    progress: 0,
    maxProgress: 20,
    rewardCoins: 500
  }
];

export const WARDROBE_OUTFITS = [
  {
    id: "saffron_classic",
    nameEn: "Kesari Saffron Vest",
    nameHi: "केसरिया पारंपरिक सदरी",
    vestColor: "#FF9933",
    kurtaColor: "#FFFFFF",
    price: 0,
    unlocked: true
  },
  {
    id: "khadi_blue",
    nameEn: "Khadi Navy Jacket",
    nameHi: "खादी नेवी ब्लू जैकेट",
    vestColor: "#003366",
    kurtaColor: "#F5F5F0",
    price: 250,
    unlocked: false
  },
  {
    id: "emerald_green",
    nameEn: "Harit Forest Green",
    nameHi: "हरित वन सदरी",
    vestColor: "#138808",
    kurtaColor: "#FFFFFF",
    price: 400,
    unlocked: false
  },
  {
    id: "ceremonial_cream",
    nameEn: "Swarna Silk Vest",
    nameHi: "स्वर्ण सिल्क सदरी",
    vestColor: "#D4AF37",
    kurtaColor: "#FFFDF0",
    price: 600,
    unlocked: false
  },
  {
    id: "tricolor_pride",
    nameEn: "Tiranga Patriot Vest",
    nameHi: "तिरंगा गौरव सदरी",
    vestColor: "#FF7722",
    kurtaColor: "#F8FAFC",
    stoleColor: "#138808",
    price: 900,
    unlocked: false
  }
];
