// Per-quiz content extracted from the live site (the builder API does not carry
// the quiz title/heading/description or the JotForm id). Keyed by quiz slug.

export type QuizContent = {
  formId: string;
  iframeTitle: string;
  h1: string;
  h2: string;
  descriptionHtml: string;
};

export const QUIZZES: Record<string, QuizContent> = {
  "bipolar-disorder": {
    "formId": "261384919274164",
    "iframeTitle": "Bipolar Test - DBH",
    "h1": "Bipolar Disorder Test",
    "h2": "Comprehensive Bipolar Disorder Screening Assessment",
    "descriptionHtml": "<p>This comprehensive assessment is designed to help you thoroughly evaluate your symptoms and history for signs of Bipolar Disorder. Utilizing the clinically validated Mood Disorder Questionnaire (MDQ), this tool examines patterns of elevated mood, energy changes, and behaviors over your lifetime. To provide the most accurate overview, the assessment also takes into account relevant family medical history and co-occurring health factors. Please complete all sections honestly to generate a detailed summary of your health profile.</p><p><strong>Important Note:</strong> This assessment serves as an advanced screening tool to help you understand your symptoms and prepare for a discussion with a professional. It does not replace a clinical diagnosis</p>"
  },
  "bipolar-disorder-dsm5": {
    "formId": "261384898721167",
    "iframeTitle": "DSM-5 Criteria for Bipolar Disorder",
    "h1": "DSM-5 Criteria for Bipolar Disorder",
    "h2": "Bipolar Disorder Screening Assessment (DSM-5 Criteria)",
    "descriptionHtml": "<p>Taking control of your mental health starts with understanding your symptoms. This screening tool is based on the official DSM-5 diagnostic criteria used by mental health professionals to evaluate for Bipolar Disorder. By tracking patterns of mood elevation (such as mania or hypomania) alongside periods of deep depression, this questionnaire helps identify the distinct emotional shifts characteristic of the condition. Please answer each question as accurately as possible based on your lived experiences.</p><p><strong>Important Note:</strong> This assessment is an educational and screening tool, not a definitive medical diagnosis. Please share your completed results with a licensed healthcare provider or mental health specialist for a comprehensive clinical evaluation.</p>"
  },
  "ptsd-checklist-civilian": {
    "formId": "261385048549163",
    "iframeTitle": "PTSD CheckList – Civilian Version (PCL-C)",
    "h1": "PTSD Checklist for Civilians (PCL-C)",
    "h2": "PTSD Screening & Trauma Assessment",
    "descriptionHtml": "<p>Experiencing or witnessing a deeply distressing or traumatic event can leave a lasting impact on your emotional and physical well-being. This screening tool utilizes the clinically recognized PTSD Checklist – Civilian Version (PCL-C) to help you evaluate how common trauma responses—such as unwanted memories, high alertness, or emotional difficulties—may be affecting your daily life. Please read each question carefully and indicate how much you have been bothered by these symptoms over the past month.</p><p><strong>Important Note:</strong> This checklist is a screening instrument designed to help track and identify trauma-related symptoms. It does not constitute a formal psychiatric diagnosis. Please share your results with a mental health professional for a proper clinical evaluation.</p>"
  },
  "am-i-alcoholic": {
    "formId": "261414639969471",
    "iframeTitle": "DBH - Am I an Alcoholic? Quiz",
    "h1": "Alcohol Use & Dependency Screening Tool",
    "h2": "Alcohol Dependency Assessment (Self-Screening Questionnaire)",
    "descriptionHtml": "<p>Reflecting honestly on your relationship with alcohol can be a vital first step toward healthier living and self-awareness. This multi-stage screening assessment is designed to help you objectively evaluate your drinking patterns, behaviors, and the role alcohol plays in your daily life. By guiding you through questions regarding consumption habits, cravings, and the social or emotional impacts of drinking, this tool helps identify potential signs of alcohol dependency or misuse. Please answer each question as honestly as possible based on your personal experiences.</p><p><strong>Important Note:</strong> This assessment is intended solely as an educational self-screening tool to help you reflect on your habits. It is completely confidential and does not substitute for a formal clinical or medical diagnosis. If you are concerned about your alcohol use, please share these insights with a primary care physician, therapist, or addiction counselor for guidance and professional support.</p>"
  },
  "am-i-addicted": {
    "formId": "261385285200150",
    "iframeTitle": "DBH - Am I Addicted Quiz",
    "h1": "Interactive Mood Disorder Questionnaire (MDQ)",
    "h2": "Bipolar Disorder Mood Symptom Screening",
    "descriptionHtml": "<p>Taking control of your mental health starts with understanding your symptoms. This screening tool is based on the official DSM-5 diagnostic criteria used by mental health professionals to evaluate for Bipolar Disorder. By tracking patterns of mood elevation (such as mania or hypomania) alongside periods of deep depression, this questionnaire helps identify the distinct emotional shifts characteristic of the condition. Please answer each question as accurately as possible based on your lived experiences.</p><p><strong>Important Note:</strong> This assessment is an educational and screening tool, not a definitive medical diagnosis. Please share your completed results with a licensed healthcare provider or mental health specialist for a comprehensive clinical evaluation.</p>"
  },
  "depression-rating-scale-phq-9": {
    "formId": "261384858892172",
    "iframeTitle": "Clone of PHQ-9 Rating Scale - RR",
    "h1": "Depression Rating Scale (PHQ-9)",
    "h2": "Clinical Depression Severity Assessment",
    "descriptionHtml": "<p>Persistent feelings of sadness, low energy, or a loss of interest in activities you once enjoyed can be signs of clinical depression. This assessment utilizes the Patient Health Questionnaire (PHQ-9), a widely trusted and clinically validated 9-item tool used by mental health professionals worldwide to screen for depression and measure symptom severity. By evaluating key areas of your life over the past two weeks—including your sleep patterns, appetite, concentration, and emotional well-being—this test helps establish an objective baseline of your current mental health. Please select the response that best reflects your day-to-day experience.</p><p><strong>Important Note:</strong> This questionnaire is a self-screening assessment tool designed to help monitor and recognize depressive symptoms. It does not replace a clinical psychiatric or medical diagnosis. Please share your results summary with a licensed healthcare provider or mental health specialist for a complete professional evaluation.</p>"
  },
  "generalized-anxiety-disorder-screening": {
    "formId": "261385166663161",
    "iframeTitle": "Patient Health Questionnaire and Generalized Anxiety Disorder Questionnaire",
    "h1": "Generalized Anxiety Disorder (GAD-7)",
    "h2": "Combined Anxiety & Depression Screening Assessment",
    "descriptionHtml": "<p>Mental health challenges rarely occur in isolation, and it is very common for symptoms of anxiety and depression to overlap. This dual screening tool combines two of the most widely trusted, clinically validated questionnaires used by healthcare providers: the PHQ-9 for assessing depressive symptoms and the GAD-7 for measuring generalized anxiety. By evaluating your mood, sleep patterns, energy levels, and worry frequency over the past two weeks, this comprehensive test helps give you a complete and clearer baseline of your emotional well-being.</p><p><strong>Important Note:</strong> This combined assessment serves as a self-screening instrument to help you map out your symptoms. It is not a definitive clinical diagnosis. Please share your results with a doctor or mental health professional for an accurate, comprehensive health evaluation.</p>"
  },
  "anxiety-worry-7": {
    "formId": "261384622145152",
    "iframeTitle": "Anxiety Questionnaire",
    "h1": "Anxiety Questionnaire (Worry 7 Scale)",
    "h2": "Chronic Worry & Anxiety Assessment",
    "descriptionHtml": "<p>Persistent worrying about everyday responsibilities can take a significant toll on your mental and physical health. This questionnaire utilizes the Worry 7 framework to help you look closer at your anxiety by evaluating the frequency and focus of your concerns over the last two weeks. By assessing common stress triggers—such as family, finances, health, and future events—this tool provides a clearer understanding of your overall worry levels. Please rate each area based on how much it has occupied your thoughts recently.</p><p><strong>Important Note:</strong> This assessment is a self-screening tool designed to help you recognize patterns of anxiety and chronic worry. It does not replace a clinical evaluation or medical diagnosis. Please consult a qualified mental health practitioner to discuss your results.</p>"
  }
};
