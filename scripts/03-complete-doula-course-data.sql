-- Complete Doula Certification Program - Full Course Data
-- This script inserts the complete course structure with all modules and lessons

-- First, insert or update the main course
INSERT INTO courses (
  title, 
  slug, 
  description, 
  long_description, 
  price, 
  duration_hours, 
  level, 
  is_published, 
  certification_included,
  thumbnail_url
) VALUES (
  'Complete Doula Certification Program',
  'complete-doula-certification',
  'Comprehensive training to become a certified birth doula',
  'This comprehensive program covers everything you need to know to become a professional birth doula. Learn about prenatal care, labor support techniques, postpartum care, and how to build your doula practice. Our evidence-based curriculum is designed by experienced doulas and includes hands-on practice, case studies, and real-world scenarios. Become a certified full-spectrum doula and make a lasting impact on families.',
  497.00,
  120,
  'beginner',
  true,
  true,
  '/doula-certification-training-classroom.jpg'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  long_description = EXCLUDED.long_description,
  price = EXCLUDED.price,
  duration_hours = EXCLUDED.duration_hours,
  level = EXCLUDED.level,
  is_published = EXCLUDED.is_published,
  certification_included = EXCLUDED.certification_included,
  thumbnail_url = EXCLUDED.thumbnail_url,
  updated_at = NOW();

-- Get the course ID for reference
DO $$
DECLARE
  v_course_id UUID;
  v_module1_id UUID;
  v_module2_id UUID;
  v_module3_id UUID;
  v_module4_id UUID;
  v_module5_id UUID;
  v_module6_id UUID;
  v_module7_id UUID;
  v_module8_id UUID;
  v_module9_id UUID;
  v_module10_id UUID;
  v_module11_id UUID;
BEGIN
  -- Get course ID
  SELECT id INTO v_course_id FROM courses WHERE slug = 'complete-doula-certification';

  -- Delete existing modules and lessons (cascade will handle lessons)
  DELETE FROM course_modules WHERE course_id = v_course_id;

  -- MODULE 1: Foundations of Doula Care
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (v_course_id, 'Foundations of Doula Care', 'The historical and cultural roots of doula work, the doula''s role, and types of support offered', 1)
  RETURNING id INTO v_module1_id;

  INSERT INTO course_lessons (module_id, title, content, video_url, duration_minutes, order_index, is_free_preview) VALUES
  (v_module1_id, 'Welcome, Future Doula!', 
   E'Congratulations! You''re taking the first step toward becoming a certified full-spectrum doula. Whether you''re here to support families through birth, postpartum recovery, or both, this journey will equip you with the knowledge, compassion, and confidence to make a lasting impact.\n\n**What You''ll Learn in This Module:**\n• The historical and cultural roots of doula work\n• The doula''s role compared to clinical providers\n• The emotional, physical, and informational support doulas offer', 
   '', 5, 1, true),
   
  (v_module1_id, 'The History and Cultural Legacy of Doula Work',
   E'Doula care is not new—it''s ancient. Across cultures and centuries, women and community members have supported birthing people through labor, delivery, and postpartum healing. From African griots and midwives to Indigenous birthkeepers and Latinx parteras, the doula''s role has always been rooted in tradition, trust, and community.\n\nIn the U.S., the modern doula movement gained momentum in the 1970s and 80s, responding to the medicalization of birth and the need for emotional support in clinical settings. Today, doulas are reclaiming ancestral wisdom while integrating evidence-based practices to serve diverse families.\n\n**Reflection Prompt:**\nThink about your own cultural background or family traditions. Were there birth practices or postpartum rituals that centered care, rest, or community? Write a short journal entry about what you''ve seen or heard.',
   '', 20, 2, true),
   
  (v_module1_id, 'The Doula''s Role vs. Clinical Providers',
   E'Let''s be clear: doulas are not medical professionals. You don''t diagnose, prescribe, or perform clinical procedures. Instead, you offer:\n\n• **Emotional support:** reassurance, encouragement, and presence\n• **Physical support:** comfort measures, positioning, massage, breathwork\n• **Informational support:** evidence-based education, birth planning, postpartum prep\n\nYou work alongside nurses, midwives, and OBs—not in competition. Your role is to center the birthing person''s voice, choices, and dignity.\n\n**Scenario Practice:**\nImagine a client is being offered an induction. They''re unsure what it means. How would you explain the procedure, offer pros and cons, and help them ask questions to their provider?',
   '', 25, 3, false),
   
  (v_module1_id, 'Types of Support Doulas Provide',
   E'Welcome to one of the most important lessons in your doula journey. In this module, we''re going beyond definitions—we''re stepping into the real-life ways doulas show up for families.\n\n**1. Prenatal Support**\nYour relationship with a client often begins during pregnancy. This is your chance to build trust, offer education, and prepare them emotionally and physically for birth.\n\nWhat this looks like:\n• Meeting for prenatal visits (virtual or in-person)\n• Helping create a birth plan that reflects their values and preferences\n• Teaching comfort techniques and labor positions\n• Discussing fears, expectations, and past birth experiences\n• Connecting them to resources: childbirth classes, mental health support, housing, nutrition\n\n**2. Labor & Birth Support**\nThis is where your presence matters most. You are the steady hand, the calm voice, the advocate when things get intense.\n\n**3. Postpartum Support**\nBirth is just the beginning. The postpartum period is tender, exhausting, and often overlooked. Your care here is vital.\n\n**4. Partner & Family Support**\nYou''re not just supporting the birthing person—you''re supporting the whole family system.\n\n**5. Resource Navigation**\nMany families face barriers—financial, emotional, systemic. You help them find the support they need.',
   '', 35, 4, false),
   
  (v_module1_id, 'Module 1 Quiz',
   E'Test your knowledge of doula foundations, history, and scope of practice.',
   '', 10, 5, false);

  -- MODULE 2: Anatomy, Physiology, and the Birth Process
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (v_course_id, 'Anatomy, Physiology, and the Birth Process', 'Understanding pregnancy, labor stages, medical interventions, and comfort measures', 2)
  RETURNING id INTO v_module2_id;

  INSERT INTO course_lessons (module_id, title, content, video_url, duration_minutes, order_index, is_free_preview) VALUES
  (v_module2_id, 'Understanding Pregnancy and Childbirth Physiology',
   E'Pregnancy is a dynamic process that transforms nearly every system in the body.\n\n**Reproductive Anatomy Overview**\n• **Uterus:** The muscular organ that expands to hold the growing fetus\n• **Cervix:** The lower part of the uterus that dilates during labor\n• **Placenta:** The organ that nourishes the baby and removes waste\n• **Amniotic Sac:** The fluid-filled membrane that cushions the fetus\n\n**Hormonal Changes**\n• **Progesterone:** Maintains pregnancy and relaxes muscles\n• **Estrogen:** Increases blood flow and prepares the body for labor\n• **Oxytocin:** Triggers contractions and bonding\n• **Relaxin:** Softens ligaments and joints for birth\n\n**Stages of Labor**\n1. Early Labor: Cervix dilates 0–6 cm, contractions are mild and irregular\n2. Active Labor: Cervix dilates 6–10 cm, contractions intensify\n3. Transition: Final dilation, intense contractions, emotional vulnerability\n4. Pushing/Birth: Baby moves through the birth canal\n5. Placenta Delivery: Afterbirth stage, uterine contractions continue',
   '', 30, 1, false),
   
  (v_module2_id, 'Recognizing Medical Interventions',
   E'While birth is a natural process, medical interventions are sometimes necessary—or offered routinely. As a doula, your role is to help clients understand their options and make informed decisions.\n\n**Common Interventions**\n• **Induction:** Using medication (Pitocin) or procedures to start labor\n• **Epidural:** Pain relief via spinal injection; may slow labor or affect pushing\n• **Cesarean Section:** Surgical birth; recovery is longer and requires emotional support\n• **Continuous Monitoring:** Tracks fetal heart rate; may limit mobility\n• **IV Fluids:** Hydration and medication delivery; may restrict movement\n\n**Questions to Help Clients Ask:**\n• "What are the risks?"\n• "What are the benefits?"\n• "What are the alternatives?"\n• "What happens if we wait?"',
   '', 25, 2, false),
   
  (v_module2_id, 'Comfort Measures and Birth Support',
   E'This is where your hands, heart, and voice become tools of transformation.\n\n**Physical Comfort Techniques**\n• **Breathing:** Slow, rhythmic breathing reduces tension and increases oxygen\n• **Massage:** Back rubs, counterpressure, and foot massage ease pain and anxiety\n• **Positioning:** Upright, side-lying, hands-and-knees—movement helps labor progress\n• **Hydrotherapy:** Warm showers or baths relax muscles and reduce pain\n• **Heat/Cold Therapy:** Rice socks, ice packs, and warm compresses offer relief\n\n**Emotional Support**\n• **Affirmations:** "You are strong. You are safe. You are doing this."\n• **Presence:** Eye contact, hand-holding, and silence can be powerful\n• **Reassurance:** Normalize sensations and emotions\n\n**Support During Cesarean Birth**\n• Help prepare emotionally for surgery\n• Stay present in the OR if allowed\n• Support bonding and breastfeeding in recovery\n• Advocate for skin-to-skin and gentle cesarean options',
   '', 40, 3, false),
   
  (v_module2_id, 'Module 2 Quiz',
   E'Test your knowledge of anatomy, physiology, and birth support techniques.',
   '', 15, 4, false);

  -- MODULE 3: Communication, Advocacy, and Emotional Support
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (v_course_id, 'Communication, Advocacy, and Emotional Support', 'Trauma-informed communication, advocacy strategies, and supporting family dynamics', 3)
  RETURNING id INTO v_module3_id;

  INSERT INTO course_lessons (module_id, title, content, video_url, duration_minutes, order_index, is_free_preview) VALUES
  (v_module3_id, 'Trauma-Informed Communication',
   E'Trauma-informed care means recognizing that many people carry invisible wounds—whether from past births, medical experiences, abuse, racism, or systemic neglect.\n\n**Core Principles:**\n1. **Safety** – Create emotional and physical safety\n2. **Trustworthiness** – Be consistent, transparent, and reliable\n3. **Choice** – Offer options and respect decisions\n4. **Collaboration** – Work with, not for, your client\n5. **Empowerment** – Reinforce strengths and autonomy\n\n**Examples of Trauma-Informed Language:**\n• Instead of: "You need to calm down."\n  Say: "You''re doing so much right now. Let''s take a breath together."\n• Instead of: "Don''t worry, it''s normal."\n  Say: "It''s common, but I hear that it feels intense for you. Let''s talk through it."',
   '', 30, 1, false),
   
  (v_module3_id, 'Effective Advocacy in Birth Settings',
   E'Advocacy is not confrontation—it''s collaboration. You help your client''s voice be heard, their choices respected, and their dignity upheld.\n\n**In Hospital Settings:**\n• Know the policies: Understand what''s allowed\n• Support informed consent: Help clients ask questions before procedures\n• Bridge communication: Translate medical jargon and encourage dialogue\n• Hold space: If staff are rushed or dismissive, you remain calm\n\n**In Home Birth Settings:**\n• Respect the midwife''s role: Collaborate, don''t compete\n• Support the birth plan: Help maintain the environment the client envisioned\n• Stay flexible: Home births can shift quickly—be ready to adapt\n• Protect the space: Limit distractions, manage guests, uphold boundaries',
   '', 25, 2, false),
   
  (v_module3_id, 'Supporting Partner and Family Dynamics',
   E'Birth is a family event. Your role includes helping partners feel confident, siblings feel included, and family members feel respected.\n\n**Partner Support:**\n• Teach hands-on comfort techniques\n• Encourage emotional presence and reassurance\n• Normalize fear, protect their role, and celebrate their efforts\n\n**Family Support:**\n• Help manage expectations and boundaries\n• Offer education to reduce anxiety or misinformation\n• Navigate cultural or generational differences with grace\n\n**Emotional Dynamics:**\n• Recognize tension, grief, or trauma in the room\n• Stay neutral, grounded, and focused on the birthing person\n• Offer referrals for family therapy or postpartum support if needed',
   '', 30, 3, false),
   
  (v_module3_id, 'Module 3 Quiz',
   E'Test your knowledge of communication, advocacy, and family support.',
   '', 15, 4, false);

  -- MODULE 4: Standards of Care and Ethics
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (v_course_id, 'Standards of Care and Ethics', 'Professional ethics, HIPAA compliance, documentation, and boundaries', 4)
  RETURNING id INTO v_module4_id;

  INSERT INTO course_lessons (module_id, title, content, video_url, duration_minutes, order_index, is_free_preview) VALUES
  (v_module4_id, 'Doula Ethics and Professional Conduct',
   E'Being a doula is more than showing up with compassion—it''s about showing up with clarity, boundaries, and responsibility.\n\n**Core Ethics:**\n1. **Non-Judgment** – Support all birth choices without imposing personal beliefs\n2. **Client-Centered Care** – The birthing person is the decision-maker\n3. **Informed Consent** – Ensure clients understand their options\n4. **Confidentiality** – Never share client information without permission\n5. **Scope of Practice** – Do not perform clinical tasks\n6. **Cultural Humility** – Respect and adapt to cultural values\n7. **Professional Boundaries** – You are a support person, not a friend or therapist\n8. **Accountability** – Own mistakes and learn from them',
   '', 25, 1, false),
   
  (v_module4_id, 'HIPAA and Confidentiality',
   E'HIPAA is a federal law that protects sensitive health information.\n\n**What Counts as Protected Health Information (PHI)?**\n• Names, addresses, phone numbers\n• Medical history, diagnoses, medications\n• Birth outcomes, mental health status\n• Any notes, photos, or recordings related to care\n\n**HIPAA Best Practices:**\n• Use initials or client codes in documentation\n• Store files in password-protected folders\n• Get written consent before sharing any information\n• Use encrypted email or secure platforms\n• Include a HIPAA clause in your service agreement',
   '', 20, 2, false),
   
  (v_module4_id, 'Documentation, Contracts, and Informed Consent',
   E'Documentation protects you legally, clarifies expectations, and supports Medicaid billing.\n\n**Key Documents Every Doula Should Use:**\n1. **Service Agreement / Contract**\n2. **Informed Consent Form**\n3. **Client Intake Form**\n4. **Birth/Postpartum Logs**\n5. **Feedback & Evaluation Forms**\n6. **Media Release Form**\n\n**Signature Protocol:**\n• Always review documents verbally before signing\n• Use secure digital signature platforms\n• Keep signed copies in encrypted folders\n• Never begin services without signed agreements',
   '', 30, 3, false),
   
  (v_module4_id, 'Module 4 Quiz',
   E'Test your knowledge of ethics, confidentiality, and documentation.',
   '', 10, 4, false);

  -- MODULE 5: CPR and First Aid Certification
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (v_course_id, 'CPR and First Aid Certification', 'Emergency preparedness for birth and postpartum support', 5)
  RETURNING id INTO v_module5_id;

  INSERT INTO course_lessons (module_id, title, content, video_url, duration_minutes, order_index, is_free_preview) VALUES
  (v_module5_id, 'Why CPR and First Aid Matter for Doulas',
   E'Birth is unpredictable. Babies can struggle to breathe. Parents can faint, bleed, or panic. You may be the only person present who knows what to do until help arrives.\n\n**CPR and First Aid training prepares you to:**\n• Respond to choking, cardiac arrest, or respiratory distress\n• Assist in bleeding, burns, or allergic reactions\n• Support newborns with breathing issues or low tone\n• Stay calm and direct others in emergencies\n• Meet Medicaid and certification requirements',
   '', 15, 1, false),
   
  (v_module5_id, 'What You''ll Learn in Certification',
   E'Courses typically include:\n• Adult, child, and infant CPR\n• AED (Automated External Defibrillator) use\n• Choking response\n• Basic wound care and bleeding control\n• Emergency scene assessment\n• Postpartum emergency response\n\nYou''ll receive a certification card valid for 2 years.',
   '', 10, 2, false),
   
  (v_module5_id, 'Where to Enroll',
   E'You must enroll in a CPR and First Aid course approved by the American Heart Association (AHA) or American Red Cross.\n\n**Online + In-Person Skills Check:**\n• American Heart Association\n• DoctorCPR\n• Cintas CPR Training\n\n**Fully In-Person:**\n• Red Cross CPR & First Aid\n• Local hospitals, fire departments, or birth centers\n\n**Fully Online:**\n• A-B-CPR (Accredited online training)',
   '', 20, 3, false),
   
  (v_module5_id, 'CPR Certification Assignment',
   E'Enroll in a CPR and First Aid course and submit your certificate.\n\nReflection: "What did you learn that surprised you? How will this training shape your doula practice?"',
   '', 5, 4, false);

  -- MODULE 6: Domestic Violence and Trauma-Informed Care
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (v_course_id, 'Domestic Violence and Trauma-Informed Care', 'Recognizing abuse, responding safely, and connecting clients to resources', 6)
  RETURNING id INTO v_module6_id;

  INSERT INTO course_lessons (module_id, title, content, video_url, duration_minutes, order_index, is_free_preview) VALUES
  (v_module6_id, 'Identifying and Responding to Domestic Violence',
   E'Domestic violence is not always physical. It can be emotional, financial, sexual, or psychological.\n\n**Common Signs of Abuse:**\n• Partner controls appointments, answers questions for client\n• Client seems fearful, withdrawn, or overly apologetic\n• Unexplained bruises, injuries, or frequent "accidents"\n• Sudden changes in mood, confidence, or behavior\n• Isolation from friends, family, or support systems\n• Partner refuses to leave room or allow private conversations\n\n**How to Respond Safely:**\n• Do not confront the abuser\n• Speak privately with the client when safe\n• Use trauma-informed language\n• Offer resources, not ultimatums\n• Document observations factually and discreetly',
   '', 30, 1, false),
   
  (v_module6_id, 'Mandatory Reporting Laws',
   E'As a doula, you may be a mandated reporter depending on your state and certification level.\n\n**Know your state''s laws:**\n• Doulas are not mandated reporters unless working under a licensed healthcare entity\n• However, if you witness abuse of a child or vulnerable adult, you are ethically obligated to report\n\n**Best Practices:**\n• Document what you see, not what you assume\n• Report to local child protective services if required\n• Always inform your client of your reporting obligations in your contract',
   '', 20, 2, false),
   
  (v_module6_id, 'Connecting Clients to Resources',
   E'You are not a therapist or shelter—but you are a bridge to safety.\n\n**National Hotlines:**\n• National Domestic Violence Hotline: 1-800-799-SAFE (7233)\n• StrongHearts Native Helpline: 1-844-762-8483\n• Teen Dating Abuse Helpline: 1-866-331-9474\n• Sexual Assault Hotline (RAINN): 1-800-656-HOPE (4673)\n\n**Approved Training Options:**\n• Aura Institute Trauma-Informed Certification\n• DCADV Online Training Center\n• National Center on Domestic and Sexual Violence\n• ProDoula Domestic Violence Training',
   '', 25, 3, false),
   
  (v_module6_id, 'DV Awareness Certification Assignment',
   E'Enroll in a domestic violence awareness course and submit your certificate.\n\nReflection: "What signs of abuse do you feel most prepared to recognize? How will you protect your client and yourself?"',
   '', 5, 4, false);

  -- MODULE 7: Lactation and Newborn Care
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (v_course_id, 'Lactation and Newborn Care', 'Supporting breastfeeding, newborn care essentials, and safe sleep practices', 7)
  RETURNING id INTO v_module7_id;

  INSERT INTO course_lessons (module_id, title, content, video_url, duration_minutes, order_index, is_free_preview) VALUES
  (v_module7_id, 'Supporting Breastfeeding and Bonding',
   E'Breastfeeding is natural—but not always easy. Your role is to support, not pressure.\n\n**Feeding Cues (Before Crying Begins):**\n• Rooting (baby turns head and opens mouth)\n• Sucking motions or lip smacking\n• Hand-to-mouth movements\n• Stirring or light fussing\n\n**Signs of a Good Latch:**\n• Baby''s mouth covers most of the areola\n• Lips are flanged outward\n• Chin and nose touch the breast\n• No clicking or smacking sounds\n• Swallowing is visible or audible\n• No pain beyond initial latch discomfort\n\n**When to Refer to a Lactation Consultant:**\n• Persistent pain or nipple damage\n• Baby not gaining weight\n• Low milk supply or oversupply\n• Tongue or lip tie concerns',
   '', 35, 1, false),
   
  (v_module7_id, 'Teaching Newborn Care',
   E'New parents often feel overwhelmed. Your calm, hands-on guidance helps them feel capable.\n\n**Essential Newborn Care Topics:**\n• **Diapering:** Change every 2–3 hours or when soiled\n• **Bathing:** Sponge baths until cord falls off\n• **Soothing:** Swaddling, rocking, white noise, skin-to-skin\n• **Burping:** After every feed\n• **Umbilical Cord Care:** Keep dry and clean\n\nNormalize that babies cry, sleep irregularly, and feed often.',
   '', 30, 2, false),
   
  (v_module7_id, 'Safe Sleep Practices',
   E'Sleep safety is non-negotiable. You must teach evidence-based guidelines to prevent SIDS.\n\n**ABCs of Safe Sleep:**\n• **Alone:** No pillows, blankets, toys, or other people\n• **Back:** Always place baby on their back to sleep\n• **Crib:** Use a firm, flat surface\n\n**Unsafe Practices:**\n• Co-sleeping on couches or adult beds\n• Loose bedding or soft mattresses\n• Overheating\n• Inclined sleepers for overnight sleep\n\n**Sleep Tips:**\n• Use a wearable blanket or sleep sack\n• Keep the room cool and dark\n• Establish a gentle bedtime routine',
   '', 25, 3, false),
   
  (v_module7_id, 'Module 7 Quiz',
   E'Test your knowledge of lactation support, newborn care, and safe sleep.',
   '', 15, 4, false);

  -- MODULE 8: Business of Doula Work & Medicaid Billing
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (v_course_id, 'Business of Doula Work & Medicaid Billing', 'Building your practice, marketing strategies, and navigating Medicaid reimbursement', 8)
  RETURNING id INTO v_module8_id;

  INSERT INTO course_lessons (module_id, title, content, video_url, duration_minutes, order_index, is_free_preview) VALUES
  (v_module8_id, 'Business and Marketing Strategies',
   E'Turn your passion into a profession.\n\n**Building Your Doula Business:**\n• Choose a business structure: Sole proprietorship, LLC, or nonprofit\n• Register your business: Get a Tax ID (EIN) and business license\n• Set your rates: Consider hourly, package, or sliding scale models\n• Create contracts: Include scope of services, fees, refund policy\n• Track income and expenses\n\n**Marketing Essentials:**\n• Build a website with service descriptions and testimonials\n• Use social media to share birth education\n• Network with midwives, OBs, and birth centers\n• Offer free workshops or webinars\n• List your services on doula directories',
   '', 30, 1, false),
   
  (v_module8_id, 'Medicaid Billing and Reimbursement',
   E'States with Active Medicaid Doula Coverage: NY, OR, MN, NJ, IN, VA, FL, DC, NE, NC, LA, RI, MA, CT\n\n**How to Register for Medicaid (NY Example):**\n1. Apply for a National Provider Identifier (NPI)\n2. Complete Medicaid Enrollment Form\n3. Sign ETIN Form in front of a notary\n4. Submit pathway documentation\n5. Contract with Managed Care Organizations\n\nNY Medicaid reimburses up to 8 prenatal/postpartum visits and 1 labor/delivery per pregnancy.',
   '', 35, 2, false),
   
  (v_module8_id, 'Preparing for Medicaid in Georgia',
   E'Georgia does not yet offer universal Medicaid doula coverage, but legislation is in progress.\n\n**You can prepare now by:**\n• Completing trauma-informed and domestic violence training\n• Applying for your NPI and Tax ID\n• Creating HIPAA-compliant documentation systems\n• Building relationships with local clinics\n• Joining advocacy efforts with Healthy Mothers, Healthy Babies Coalition',
   '', 20, 3, false),
   
  (v_module8_id, 'Alternative Payment Models',
   E'**Other Ways to Get Paid:**\n• Private Pay Clients: Offer packages and payment plans\n• Health Savings Accounts (HSAs): Some clients can use HSA/FSA funds\n• Grants and Stipends: Apply through maternal health nonprofits\n• Hospital Partnerships: Contract as a per diem doula\n• Community-Based Organizations: Get paid through programs serving Medicaid populations\n• Doula Collectives: Share resources and billing systems',
   '', 25, 4, false),
   
  (v_module8_id, 'Module 8 Quiz',
   E'Test your knowledge of business practices and Medicaid billing.',
   '', 10, 5, false);

  -- MODULE 9: Cultural Competency & Health Equity
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (v_course_id, 'Cultural Competency & Health Equity', 'Providing culturally responsive care and addressing systemic disparities', 9)
  RETURNING id INTO v_module9_id;

  INSERT INTO course_lessons (module_id, title, content, video_url, duration_minutes, order_index, is_free_preview) VALUES
  (v_module9_id, 'Providing Culturally Responsive Care',
   E'Culturally responsive care means adapting your support to honor the values, beliefs, and lived experiences of each client.\n\n**What It Looks Like:**\n• Asking about cultural or spiritual birth traditions\n• Respecting dietary restrictions and modesty preferences\n• Using inclusive language around gender and pronouns\n• Offering resources in the client''s preferred language\n• Avoiding assumptions based on race, religion, or appearance\n\nCultural responsiveness is about being curious, respectful, and willing to learn.',
   '', 30, 1, false),
   
  (v_module9_id, 'Addressing Racial Disparities and Implicit Bias',
   E'**The Reality:**\n• Black birthing people are 3–4 times more likely to die from pregnancy-related causes\n• Indigenous and Latinx communities face higher rates of preterm birth\n• LGBTQ+ families often experience discrimination and misgendering\n\nThese disparities are the result of systemic racism, bias, and unequal access to care.\n\n**What Is Implicit Bias?**\nUnconscious attitudes or stereotypes that affect how we treat others.\n\n**Your role:** Notice when bias shows up—and interrupt it.',
   '', 35, 2, false),
   
  (v_module9_id, 'Practicing Cultural Humility',
   E'Cultural humility is a lifelong practice. It means recognizing that you don''t know everything—and that your clients are the experts in their own lives.\n\n**Core Principles:**\n1. **Self-Reflection:** Examine your own biases and privileges\n2. **Client-Led Care:** Let the client define what respectful support looks like\n3. **Accountability:** Own mistakes and commit to growth\n4. **Collaboration:** Work with interpreters and community leaders\n\nCultural humility is not a checklist—it''s a mindset.',
   '', 25, 3, false),
   
  (v_module9_id, 'Module 9 Quiz',
   E'Test your knowledge of cultural competency and health equity.',
   '', 10, 4, false);

  -- MODULE 10: Practicum / Fieldwork
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (v_course_id, 'Practicum / Fieldwork', 'Hands-on client experience, documentation, and supervised practice', 10)
  RETURNING id INTO v_module10_id;

  INSERT INTO course_lessons (module_id, title, content, video_url, duration_minutes, order_index, is_free_preview) VALUES
  (v_module10_id, 'What Fieldwork Looks Like',
   E'Your practicum includes:\n• Attending two births (in-person or approved simulation)\n• Providing two postpartum visits\n• Submitting birth logs and reflective journals\n• Receiving supervision and feedback from certified mentors\n\n**Birth Support Practicum:**\n• Be on-call for a client near their due date\n• Attend prenatal visits to build rapport\n• Support labor with comfort measures and advocacy\n• Document the birth timeline and your role\n\n**Postpartum Support Practicum:**\n• Visit within the first 2 weeks\n• Assist with newborn care and feeding\n• Offer resources for lactation and mental health',
   '', 20, 1, false),
   
  (v_module10_id, 'Documentation Requirements',
   E'You must submit:\n• Birth Logs: Date, location, duration, services provided\n• Postpartum Logs: Services, feeding support, emotional check-in\n• Reflective Journals: What you learned and how you grew\n• Mentor Feedback Forms: Signed evaluations\n\nExample: "Client labored for 12 hours. I provided counterpressure, breath coaching, and helped advocate for delayed cord clamping."',
   '', 15, 2, false),
   
  (v_module10_id, 'How to Obtain Clientele',
   E'**Ways to Find Clients:**\n• Offer free or sliding-scale services to friends or family\n• Partner with local birth centers and midwives\n• Join doula collectives or community programs\n• Post in parenting groups and local communities\n• Volunteer with nonprofits serving Medicaid families\n• Attend prenatal classes and introduce yourself\n\nAlways use a signed service agreement—even for free clients.',
   '', 20, 3, false),
   
  (v_module10_id, 'Ethical Considerations During Fieldwork',
   E'• **Informed Consent:** Clients must know you are a student doula\n• **Confidentiality:** Document with initials, never share without permission\n• **Boundaries:** Maintain professional distance with compassionate care\n• **Supervision:** Seek feedback and reflect on your growth',
   '', 15, 4, false);

  -- MODULE 11: Certification Portfolio & Final Requirements
  INSERT INTO course_modules (course_id, title, description, order_index)
  VALUES (v_course_id, 'Certification Portfolio & Final Requirements', 'Portfolio submission, book study, and certification completion', 11)
  RETURNING id INTO v_module11_id;

  INSERT INTO course_lessons (module_id, title, content, video_url, duration_minutes, order_index, is_free_preview) VALUES
  (v_module11_id, 'Hands-On Client Experience (60 Hours)',
   E'To complete your certification, you must document at least 60 hours of direct client care.\n\n**Required Fieldwork:**\n• 3 Births Attended\n• Postpartum Visits (minimum 6 total)\n• Prenatal Visits (minimum 6 total)\n• On-call Support\n\n**Required Documentation:**\n• Client Intake Forms\n• Service Agreements\n• Birth Logs\n• Postpartum Logs\n• Reflective Journal Entries\n• Client Feedback Forms\n• Mentor/Supervisor Evaluations',
   '', 25, 1, false),
   
  (v_module11_id, 'Doula Book Study & Reflection Paper',
   E'Choose 3 books from the approved list and submit a 5-page reflection paper.\n\n**Approved Books:**\n1. The Birth Partner by Penny Simkin\n2. The First Forty Days by Heng Ou\n3. Reproductive Justice by Loretta Ross & Rickie Solinger\n4. Nurture by Erica Chidi\n5. Babies Are Not Pizzas by Rebecca Dekker\n6. The Doula Book by Marshall Klaus\n\n**Paper Guidelines:**\n• Minimum 5 pages, double-spaced\n• Include insights from all 3 books\n• Reflect on how readings shaped your understanding\n• Include at least one quote from each book',
   '', 30, 2, false),
   
  (v_module11_id, 'Final Submission Checklist',
   E'**Certification Checklist:**\n☐ 60+ hours of client care documented\n☐ 3 births attended\n☐ All logs, forms, and journals submitted\n☐ 5-page book reflection paper submitted\n☐ CPR/First Aid certificate on file\n☐ Domestic Violence certificate on file\n\nOnce your portfolio is reviewed and approved, you will receive your **Certified Full-Spectrum Doula: Birth & Postpartum** credential.',
   '', 20, 3, false);

END $$;

-- Update instructor information
UPDATE courses 
SET long_description = REPLACE(
  long_description,
  '',
  'Ashley Strong'
)
WHERE slug = 'complete-doula-certification';

-- Add instructor profile (if you have an instructor table, adjust accordingly)
-- This is a comment showing where instructor data would go if needed

SELECT 'Complete Doula Certification course data inserted successfully!' as status;
