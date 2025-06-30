document.addEventListener('DOMContentLoaded', () => {
    // --- Game Configuration ---
    const SCENARIOS = [
        // Egyptianized Scenarios (100 total) - List truncated for brevity
        { crime: "تم استبدال عقد ألماسي شهير بقطعة زجاج خلال حفل زفاف كبير في فندق بالقاهرة.", suspect_roles: ["منظم الحفل (Wedding Planner) 📋", "صائغ المجوهرات 💍", "مصور فوتوغرافي 📸", "كابتن صالة 🍹", "صديقة العروس المقربة 👯", "حارس شخصي 🛡️", "مطرب الفرح 🎤", "أحد أقارب العريس 👨‍👦", "سائق ليموزين 🚗", "عامل صيانة بالفندق 🔧"], clues: ["تم العثور على غبار زجاجي دقيق بالقرب من علبة العقد.", "أحد أسلاك كاميرات المراقبة في القاعة تم فصله مؤقتًا.", "شوهد شخص متوتر يغادر القاعة مبكرًا ويتعثر."] },
        { crime: "اختفت بردية أثرية نادرة من المتحف المصري بالتحرير.", suspect_roles: ["أمين المتحف 🏛️", "مرمم آثار 🖌️", "أستاذ تاريخ مصريات 📜", "باحث زائر 🧐", "حارس أمن في وردية ليلية 🔦", "طالب دراسات عليا 🎓", "عامل نظافة 🧹", "مسؤول الإضاءة 💡", "سائح مهتم بالآثار 📷", "موظف أرشيف 🗃️"], clues: ["تم تجاوز القفل الإلكتروني لأحد غرف العرض باستخدام بطاقة دخول قديمة.", "شوهد شخص يحمل أنبوبًا طويلاً من الكرتون بشكل مريب.", "أحد المشتبه بهم لديه ديون قمار كبيرة."] },
        { crime: "تم تسريب إشاعة عن وجود أزمة في أحد البنوك الكبرى، مما أدى لتدافع العملاء لسحب أموالهم.", suspect_roles: ["محلل مالي 📈", "مدير فرع منافس 👨‍💼", "موظف سابق بالبنك 😠", "صحفي اقتصادي 📰", "هاكر مبتدئ 💻", "مستثمر خسر أمواله 💰", "مسؤول سوشيال ميديا 📢", "وسيط في البورصة 📊", "خبير أمن معلومات 🛡️", "موظف خدمة عملاء حالي 📞"], clues: ["تم نشر الشائعة من حسابات وهمية على فيسبوك.", "تحليل لغوي للمنشورات يشير لمعرفة دقيقة بمصطلحات بنكية داخلية.", "تم تنفيذ عمليات بيع لأسهم البنك قبل انتشار الشائعة بدقائق."] },
        { crime: "تم تخريب محرك يخت في مارينا بالساحل الشمالي قبل سباق الصيف السنوي.", suspect_roles: ["قبطان اليخت ⚓", "ميكانيكي بحري 🔧", "مالك يخت منافس 🛥️", "منظم السباق 🏁", "صحفي يغطي أخبار المجتمع 🎤", "مهندس محركات ⚙️", "عضو طاقم باليخت 🧑‍✈️", "مسؤول المارينا 🏖️", "وكيل تأمين 📝", "صياد محلي 🎣"], clues: ["تم وضع سكر في خزان الوقود ليتلف المحرك ببطء.", "شوهد ضوء خافت بالقرب من اليخت في منتصف الليل.", "أحد المشتبه بهم خسر مبلغًا كبيرًا في رهان على السباق."] },
        { crime: "تم إتلاف محصول مانجو نادر في حديقة الأورمان قبل موسم الحصاد.", suspect_roles: ["عالم نباتات 🌱", "كبير الجناينية 👨‍🌾", "باحث في علم الفاكهة 🥭", "مدير الحديقة 🏞️", "مصور طبيعة 📸", "مرشد سياحي 🚶‍♀️", "مورد أسمدة ⚗️", "شيف حلواني 👨‍🍳", "طالب بكلية الزراعة 🎓", "مسؤول الصيانة 🔧"], clues: ["تم استخدام مبيد حشري غير مناسب عمدًا على أشجار المانجو.", "تم العثور على آثار أقدام لا تتطابق مع أحذية موظفي الحديقة.", "أحد المشتبه بهم أبدى اهتمامًا غير عادي بهذا النوع من المانجو."] },
        { crime: "تم تخريب بث مباراة القمة بين الأهلي والزمالك عن طريق قطع كابل البث الرئيسي.", suspect_roles: ["مهندس بث في التلفزيون 📡", "مخرج المباراة 🎬", "معلق رياضي 🎙️", "فني كاميرات بالاستاد 🎥", "مشجع متعصب لأحد الفريقين 😠", "حارس أمن في غرفة التحكم 🛡️", "مقاول كان يعمل بجوار الاستاد 🏗️", "صحفي رياضي 📰", "موظف سابق في قناة البث 👨‍💻", "عامل نظافة بالاستاد 🧹"], clues: ["تم القطع بأداة احترافية تستخدم في تمديد الكابلات.", "شوهدت سيارة فان بيضاء غير معروفة تغادر محيط الاستاد بسرعة.", "أحد المشتبه بهم كان يراهن على عدم إذاعة المباراة."] },
        { crime: "تمت سرقة تركيبة عطر شرقي سرية من محل عطارة شهير في خان الخليلي.", suspect_roles: ["العطار صاحب المحل 👃", "صانع (مساعد) في المحل 🧪", "صاحب محل عطور منافس 😠", "مرشد سياحي 🗣️", "تاجر توابل بالجملة 🌶️", "خبير تقييم عطور 🧐", "زبون دائم للمحل 🧑", "مورد زجاجات عطر 🎁", "كاتب عن تاريخ العطور ✍️", "صاحب بازار مجاور 🏺"], clues: ["تمت سرقة دفتر الوصفات القديم فقط دون أي أموال.", "تم العثور على بصمة جزئية على زجاجة عنبر فارغة.", "أحد المشتبه بهم سأل مؤخرًا عن سعر تركيبة مشابهة."] },
        { crime: "تم استبدال حذاء لاعب كرة قدم شهير بآخر ضيق عمدًا قبل مباراة هامة.", suspect_roles: ["اللاعب المنافس في نفس المركز 😠", "عامل غرف الملابس 👕", "مدرب الأحمال البدنية 🏋️‍♂️", "وكيل اللاعب 💼", "طبيب الفريق 👨‍⚕️", "مشجع متعصب 🗣️", "صانع أحذية رياضية 👟", "مسؤول صيانة أرض الملعب 🌱", "مراهن كبير 💸", "صحفي رياضي 🎙️"], clues: ["الحذاء البديل كان من نفس الماركة واللون تمامًا.", "شوهد شخص بالقرب من دولاب اللاعب في وقت متأخر.", "أحد المشتبه بهم كان على خلاف مع اللاعب بسبب عقد إعلانات."] },
        { crime: "تم إفساد عينة دواء حيوية في معمل أبحاث، مما أدى إلى تأخير إطلاقه.", suspect_roles: ["عالم أبحاث 🔬", "فني مختبر 🧪", "مدير المشروع 📂", "طالب دكتوراه 🎓", "ممول للأبحاث 💰", "ممثل شركة أدوية منافسة 💊", "ناشط حقوق حيوان 🐾", "عامل صيانة 🔧", "مسؤول مشتريات 🛒", "حارس أمن 🛡️"], clues: ["تم تغيير درجة حرارة الحاضنة التي تحتوي على العينة.", "سجلات الدخول للمختبر تظهر وجود شخص غير مصرح له بالدخول ليلاً.", "تم العثور على أثر لمادة غريبة لا تنتمي للمختبر قرب العينة."] },
        { crime: "تمت سرقة بيانات العملاء من خوادم بنك رقمي كبير.", suspect_roles: ["خبير أمن سيبراني 🛡️", "مهندس قاعدة بيانات 🗄️", "مدير منتج 📱", "موظف خدمة عملاء 📞", "مستشار خارجي 👨‍💼", "هاكر أخلاقي سابق 👨‍💻", "مدقق حسابات 🧾", "مسؤول أنظمة 💻", "مطور تطبيقات 👨‍🔬", "متدرب جديد 👶"], clues: ["تم الاختراق عبر ثغرة أمنية في بروتوكول نقل الملفات.", "تمت عملية سحب البيانات ببطء على مدى عدة أيام لتجنب اكتشافها.", "آخر تحديث للنظام تم إجراؤه بواسطة أحد المشتبه بهم."] },
        { crime: "اختفى دليل إدانة رئيسي من غرفة الأدلة في قسم الشرطة.", suspect_roles: ["محقق 🕵️", "محامي دفاع ⚖️", "ضابط دورية 👮", "فني أدلة جنائية 🔬", "أمين غرفة الأدلة 🗃️", "وكيل نيابة 👨‍⚖️", "منظف ليلي 🧹", "صحفي متخصص بالجريمة 📰", "شاهد في القضية 👁️", "خبير أمني 💻"], clues: ["تم العثور على مشبك ورق مثني بشكل غريب قرب باب غرفة الأدلة.", "سجل الدخول والخروج للغرفة تم التلاعب به.", "أحد المشتبه بهم كان لديه إمكانية الوصول إلى مفاتيح الغرفة."] },
        { crime: "تم تسريب نهاية فيلم منتظر بشدة على الإنترنت قبل عرضه.", suspect_roles: ["مخرج الفيلم 🎬", "كاتب السيناريو ✍️", "مونتير 🎞️", "مسؤول المؤثرات الخاصة 💥", "ممثل ثانوي 🎭", "مساعد إنتاج 📋", "مدير تسويق 📢", "ناقد سينمائي 🎥", "عامل في دار السينما 🍿", "هاكر 💻"], clues: ["الملف المسرب كان نسخة أولية بجودة منخفضة.", "تم تتبع التسريب إلى شبكة واي فاي عامة في أحد الكافيهات.", "أحد المشتبه بهم عبر عن استيائه من نهاية الفيلم علنًا."] },
        { crime: "تمت سرقة تصميم معماري مبتكر لمبنى في العاصمة الإدارية.", suspect_roles: ["مهندس معماري 🏗️", "مقاول بناء 👷", "مصمم داخلي 🛋️", "رسام هندسي 📐", "مستثمر عقاري ", "طالب هندسة 🎓", "موظف في جهاز المدينة 🏛️", "خبير استدامة 🌳", "مدير مشروع 💼", "فني طباعة ثلاثية الأبعاد 🖨️"], clues: ["تمت سرقة الملفات من خادم سحابي ضعيف الحماية.", "أحد المشتبه بهم كان يعمل سابقًا في الشركة المنافسة التي فازت بالمشروع.", "تم رصد محاولة بيع التصميم في منتدى على الإنترنت المظلم."] },
        { crime: "تم استبدال قطعة أثرية في مزاد علني بنسخة مقلدة.", suspect_roles: ["مدير المزاد 🔨", "خبير تقييم آثار 🧐", "جامع تحف ثري 💰", "مرمم فني 🖌️", "مؤرخ 📜", "حارس أمن 🛡️", "موظف دار المزاد 📋", "صحفي فني 📰", "صانع قوالب 🏺", "وسيط فني 🤝"], clues: ["النسخة المقلدة متقنة الصنع لكنها تزن أقل من الأصلية ببضعة جرامات.", "كاميرات المراقبة أظهرت ظل شخص يختبئ خلف ستارة.", "أحد المشتبه بهم لديه خبرة في صناعة النسخ المقلدة."] },
        { crime: "تم استبدال أدوية بيطرية بأخرى منتهية الصلاحية في عيادة بيطرية كبيرة.", suspect_roles: ["طبيب بيطري 👨‍⚕️", "مساعد بيطري 💉", "مسؤول استقبال 📋", "صاحب حيوان أليف غاضب 😠", "مندوب مبيعات أدوية 💊", "عامل نظافة 🧹", "مدير العيادة 💼", "فني مختبر 🔬", "مربي حيوانات أليفة 🐶", "مسؤول المشتريات 🛒"], clues: ["تم العثور على عبوات أدوية فارغة في غير مكانها.", "سجلات الجرد تظهر وجود فائض في الأدوية منتهية الصلاحية.", "أحد المشتبه بهم كان يمر بأزمة مالية."] },
        { crime: "تم تسريب أسئلة امتحان هام من داخل مطبعة سرية.", suspect_roles: ["مدرس خصوصي 👨‍🏫", "عامل في المطبعة 🖨️", "مشرف على الطباعة 🧐", "موظف بوزارة التعليم 🏛️", "ولي أمر طالب 👨‍👩‍👧", "هاكر 💻", "صاحب مركز دروس خصوصية 🏢", "سائق عربة نقل الورق 🚚", "فني صيانة ماكينات طباعة 🔧", "حارس أمن المطبعة 🛡️"], clues: ["تم تصوير الأسئلة بهاتف محمول.", "الورق المستخدم في التسريب هو نفس نوع ورق الامتحانات الرسمي.", "تم العثور على مبلغ مالي كبير في حساب أحد المشتبه بهم مؤخرًا."] },
        { crime: "تم تزوير لوحة فنية وبيعها على أنها أصلية لجامع أعمال فنية.", suspect_roles: ["رسام موهوب 🎨", "صاحب معرض فني 🖼️", "مرمم لوحات 🖌️", "خبير تقييم فني 🧐", "مؤرخ فني 📜", "وسيط فني 🤝", "طالب فنون جميلة 🎓", "صانع إطارات (براويز) 🖼️", "سائق نقل 🚚", "جامع أعمال فنية آخر 💰"], clues: ["التحليل الكيميائي أظهر أن الطلاء المستخدم حديث جدًا.", "التوقيع على اللوحة كان متقنًا ولكنه يفتقر لبعض التفاصيل الدقيقة.", "أحد المشتبه بهم لديه معرفة عميقة بأسلوب الفنان الأصلي."] },
        { crime: "تم تخريب تمثال شمع لشخصية مشهورة في متحف الشمع.", suspect_roles: ["النحات الذي صنع التمثال 🗿", "مدير المتحف 🏛️", "حارس أمن 🛡️", "فني صيانة 🔧", "ناقد فني ✍️", "شخصية عامة منافسة 😠", "مرشد سياحي 🗣️", "عامل نظافة 🧹", "مصور فوتوغرافي 📸", "زائر كان يسخر من التمثال 😆"], clues: ["تم استخدام مصدر حرارة صغير لإذابة جزء من وجه التمثال.", "تم العثور على علكة ملتصقة بقاعدة التمثال.", "أحد المشتبه بهم لديه خلاف شخصي مع الشخصية التي يمثلها التمثال."] },
        { crime: "تمت سرقة جهاز نادر لتسجيل الأصوات من استوديو إذاعي قديم.", suspect_roles: ["مهندس صوت 🎙️", "مذيع راديو 📻", "مدير المحطة 🏢", "جامع أجهزة كلاسيكية 📼", "فني صيانة 🛠️", "مؤرخ إذاعي 📜", "حارس أمن 🛡️", "موسيقي يسجل في الاستوديو 🎶", "طالب إعلام 🎓", "كهربائي ⚡"], clues: ["تم فك الجهاز من مكانه دون إتلاف التوصيلات المحيطة.", "أحد المشتبه بهم كان يبحث عن قطع غيار نادرة لنفس الجهاز.", "تم تعطيل كاميرا المراقبة في الممر المؤدي للاستوديو."] },
        { crime: "تم تخريب طبق رئيسي لمتسابق في نهائي مسابقة طهي تلفزيونية.", suspect_roles: ["طاهٍ منافس 👨‍🍳", "عضو لجنة تحكيم 👨‍⚖️", "مقدم البرنامج 📺", "منتج 🎬", "محرر فيديو 💻", "مدير المسرح 🎭", "مسؤول التصويت 🗳️", "ناقد طعام 🍽️", "راعٍ للبرنامج 💰", "عامل إضاءة 💡"], clues: ["تم العثور على عبوة فارغة لمكون يسبب الحساسية في سلة مهملات خلف الكواليس.", "كاميرات المراقبة أظهرت أن الضحية ترك محطته دون رقابة لدقيقة واحدة فقط.", "أحد المشتبه بهم لديه حساسية معروفة من نفس المكون المستخدم في التخريب."] },
        { crime: "تمت سرقة لحن أغنية جديدة من استوديو تسجيل شهير قبل طرحها.", suspect_roles: ["ملحن الأغنية 🎼", "موزع موسيقي 🎹", "مهندس صوت 🎧", "مطرب منافس 🎤", "مدير أعمال الفنان 💼", "شاعر غنائي ✍️", "عازف جيتار 🎸", "متعهد حفلات 🎪", "مسؤول سوشيال ميديا 📱", "فني صيانة بالاستوديو 🔧"], clues: ["تم تسريب مقطع قصير من اللحن على واتساب.", "آخر شخص تواجد في الاستوديو بمفرده هو أحد المشتبه بهم.", "ملف المشروع على الكمبيوتر تم فتحه في وقت متأخر من الليل."] },
        { crime: "تم تخريب مركب فلوكة في أسوان لمنعها من الفوز في سباق النيل السنوي.", suspect_roles: ["صاحب الفلوكة (المراكبي) ⛵", "نجار يصلح المراكب 🔨", "صاحب فلوكة منافسة 😠", "منظم السباق 🏆", "مرشد سياحي 🗺️", "فنان يرسم على المراكب 🎨", "صياد 🎣", "صاحب فندق على النيل 🏨", "بائع هدايا تذكارية 🎁", "مسؤول المرسى ⚓"], clues: ["تم العثور على ثقب صغير تم سده بالطين بشكل مؤقت في جسم الفلوكة.", "شوهد شخص يسبح قرب المرسى في وقت متأخر من الليل.", "أحد المشتبه بهم راهن بمبلغ كبير ضد الفلوكة الفائزة دائمًا."] },
        { crime: "تم استبدال شحنة ملابس ماركات عالمية بأخرى مقلدة في سوق بالعتبة.", suspect_roles: ["تاجر جملة 📦", "صاحب محل ملابس 👕", "عامل في المخزن 🏭", "سائق شاحنة النقل 🚚", "وسيط جمركي 👮‍♂️", "صاحب محل منافس 😠", "خبير في تقييم الماركات 🧐", "مسؤول أمن السوق 🛡️", "بائع متجول 🗣️", "زبون اشترى بضاعة مؤخرًا 🛍️"], clues: ["الباركود على القطع المقلدة لا يمكن قراءته بواسطة الماسح الضوئي.", "تم العثور على بقايا أكياس تغليف أصلية في حاوية قمامة قريبة.", "أحد المشتبه بهم قام برحلة مفاجئة إلى بلد معروف بصناعة الملابس المقلدة."] },
        { crime: "تمت سرقة الوصفة السرية لدقة أشهر محل كشري في وسط البلد.", suspect_roles: ["صاحب المحل 👨‍🍳", "شيف مساعد 🔪", "عامل نظافة 🧹", "مورد توابل 🌶️", "صاحب عربة كشري منافسة 😠", "مدون طعام (فود بلوجر) ✍️", "زبون قديم يحاول فتح مطعم 👨‍💼", "مسؤول مشتريات المطعم 🛒", "سائق توصيل الطلبات (دليفري) 🛵", "فني صيانة 🔧"], clues: ["تم العثور على ورقة مكتوب عليها جزء من الوصفة في سلة مهملات المطبخ.", "أحد المشتبه بهم كان يسأل العمال عن المكونات بشكل متكرر.", "تم تعطيل كاميرا المراقبة التي تغطي مكتب المدير."] },
        { crime: "تمت سرقة مخطوطة قرآنية نادرة من مكتبة مسجد الحسين.", suspect_roles: ["إمام المسجد 🕌", "مرمم مخطوطات 📜", "جامع تحف إسلامية 💰", "طالب في كلية الآثار الإسلامية 🎓", "حارس أمن المسجد 🛡️", "باحث في الفن الإسلامي 🧐", "سائح مهتم بالآثار 📸", "خطاط ✒️", "عامل نظافة 🧹", "موظف في وزارة الأوقاف 🏛️"], clues: ["تم فتح القفل القديم للخزانة الزجاجية باستخدام مفتاح مصطنع.", "تم العثور على أثر قفازات على الزجاج.", "أحد المشتبه بهم عرض بيع قطعة أثرية مشابهة مؤخرًا عبر الإنترنت."] },
        { crime: "تم تسريب سيناريو مسلسل رمضان القادم لكاتب شهير.", suspect_roles: ["الكاتب نفسه ✍️", "المخرج 🎬", "بطل المسلسل 🌟", "مساعد المخرج 📋", "منتج فني 💰", "مسؤول الرقابة على المصنفات الفنية 🎭", "عامل بوفيه في موقع التصوير ☕", "صحفي فني 📰", "ممثل يؤدي دورًا ثانويًا 😠", "مدير أعمال الكاتب 💼"], clues: ["تم نشر أول مشهد من المسلسل على صفحة فيسبوك مجهولة.", "النسخة المسربة كانت نسخة قديمة تفتقر للتعديلات الأخيرة.", "أحد المشتبه بهم كان على خلاف مع المخرج حول نهاية المسلسل."] },
        { crime: "تم تخريب معدات غطس في مركز شهير بشرم الشيخ.", suspect_roles: ["مدرب غطس 🤿", "صاحب مركز غطس منافس 😠", "سائح غاضب 😡", "فني صيانة معدات 🔧", "مصور تحت الماء 📸", "عالم أحياء بحرية 🐠", "مسؤول تنظيم رحلات 📅", "حارس أمن المركز 🛡️", "صياد 🎣", "موظف استقبال في الفندق 🏨"], clues: ["تم العثور على قطع صغيرة في منظمات الهواء (Regulators).", "سجل الصيانة يظهر أن أحد المشتبه بهم قام بفحص المعدات مؤخرًا.", "شوهد شخص يتسلل إلى غرفة المعدات في وقت متأخر."] },
        { crime: "تمت سرقة تركيبة بهارات نادرة من سوق التوابل في أسوان.", suspect_roles: ["عطار نوبي 👳", "شيف فندق كبير 👨‍🍳", "سائح متخصص في الطهي 🌶️", "تاجر توابل منافس 😠", "باحث في الأنثروبولوجيا الغذائية 📚", "مصور وثائقي 🎥", "مرشد سياحي 🚶‍♂️", "صاحب مطعم أسماك 🐟", "مورد أعشاب طبية 🌿", "صانع هدايا تذكارية 🎁"], clues: ["تمت سرقة الجرار التي تحتوي على الخلطة فقط.", "تم العثور على أثر قدم لحذاء غير شائع في المنطقة.", "أحد المشتبه بهم حاول شراء التركيبة من قبل وفشل."] },
        { crime: "تم بيع شاليه في الساحل الشمالي لشخصين مختلفين في نفس الوقت.", suspect_roles: ["صاحب الشاليه 🏠", "سمسار عقارات 🔑", "محامي ⚖️", "موظف في الشهر العقاري ✍️", "مقاول بناء 🏗️", "مدير أمن القرية السياحية 🛡️", "صديق البائع 🤝", "المشتري الأول 👨‍👩‍👧‍👦", "مهندس معماري 📐", "جار للشاليه 🏡"], clues: ["أحد العقود كان يحمل توقيعًا مزورًا ببراعة.", "تم إيداع مبلغ مالي كبير في حساب أحد المشتبه بهم من مصدر مجهول.", "شوهد السمسار يتجادل مع صاحب الشاليه حول عمولته."] },
        { crime: "تم إعطاء مادة منشطة لحصان سباق في نادي الجزيرة للفروسية.", suspect_roles: ["صاحب الحصان 🐎", "الفارس (الجوكى) 🏇", "الطبيب البيطري 💉", "مدرب الخيول 👨‍🏫", "صاحب حصان منافس 😠", "مراهن كبير 💸", "عامل الإسطبل (السايس) 🧹", "مورد العلف 🌾", "حكم السباق 🏁", "حداد الخيول (البيطار) 🔨"], clues: ["تم العثور على حقنة فارغة في القش.", "أظهر الحصان نشاطًا مفرطًا وغير طبيعي قبل السباق.", "أحد المشتبه بهم لديه إمكانية الوصول إلى الإسطبلات ليلاً."] },
        { crime: "تمت سرقة مجموعة تحف فضية قيمة من فيلا في الزمالك.", suspect_roles: ["صاحب الفيلا 💰", "مدبرة المنزل 🧹", "البستاني 🌳", "تاجر أنتيكات 🏺", "حارس أمن خاص 🛡️", "صديق للعائلة 😠", "خبير تقييم فني 🧐", "كهربائي كان يعمل في الفيلا ⚡", "سائق العائلة 🚗", "أحد الأقارب 👨‍👩‍👧‍👦"], clues: ["تم تعطيل نظام الإنذار باستخدام رمز قديم.", "لم يتم كسر أي أبواب أو نوافذ.", "أحد المشتبه بهم كان يمر بأزمة مالية خانقة."] },
        { crime: "تم الإبلاغ عن حالة تسمم غذائي مزيفة في مطعم فاخر لابتزاز المالك.", suspect_roles: ["الزبون المدعي 🤢", "طاهي بالمطعم 👨‍🍳", "مدير المطعم 👔", "طبيب في قسم الطوارئ 👨‍⚕️", "محامي الزبون ⚖️", "صاحب مطعم منافس 😠", "مفتش صحة سابق 📋", "نادلة في القسم 📝", "غاسل أطباق 🧼", "صحفي متخصص في النقد الغذائي ✍️"], clues: ["التحاليل الطبية للزبون لم تظهر أي علامات تسمم.", "شوهد الزبون يأكل في مطعم آخر في نفس الليلة.", "أحد المشتبه بهم لديه تاريخ في عمليات الاحتيال المماثلة."] },
        { crime: "تم اختراق حساب إنستغرام لممثلة شهيرة ونشر صور شخصية.", suspect_roles: ["الممثلة نفسها 🌟", "مدير أعمالها 💼", "مساعدتها الشخصية 📱", "صديقها السابق 😠", "هاكر مأجور 💻", "مسؤول السوشيال ميديا الخاص بها 👨‍💻", "مصور فوتوغرافي 📸", "ممثلة منافسة 💅", "صحفي فني 📰", "معجب مهووس"], clues: ["تم تغيير كلمة المرور من جهاز كمبيوتر في مقهى إنترنت عام.", "تم نشر الصور في وقت حساس قبل إطلاق فيلمها الجديد.", "أحد المشتبه بهم كان يعرف إجابة سؤال الأمان الخاص بحسابها."] },
        { crime: "تمت سرقة مخطوطات نادرة من مكتبة دير سانت كاترين.", suspect_roles: ["راهب في الدير ☦️", "أمين المكتبة 📚", "مرمم مخطوطات 🖌️", "باحث في مقارنة الأديان 📜", "مرشد سياحي بدوي 🐪", "حارس أمن 🛡️", "جامع تحف ثري 💰", "مصور وثائقيات 🎥", "طالب تاريخ 🎓", "موظف بوزارة الآثار 🏛️"], clues: ["تمت السرقة أثناء عاصفة رملية أدت إلى انقطاع الكهرباء.", "تم العثور على أثر لحبل يستخدم للتسلق على أحد الجدران.", "أحد المشتبه بهم كان يسأل عن قيمة المخطوطات السوقية."] },
        { crime: "تم تخريب عمل فني تركيبي في بينالي القاهرة الدولي.", suspect_roles: ["فنان مشارك آخر 🎨", "أمين البينالي (المنسق) 🖼️", "ناقد فني مؤثر ✍️", "عامل تركيبات 🔧", "راعٍ للحدث الفني 💰", "طالب فنون جميلة 🎓", "صحفي ثقافي 📰", "حارس أمن ليلي 🔦", "مسؤول الإضاءة 💡", "جامع أعمال فنية 🧐"], clues: ["تم استخدام مادة لاصقة قوية لتشويه أجزاء من العمل.", "تم تعطيل إنذار الحركة في تلك الصالة تحديدًا.", "عُثر على بقايا قفازات في سلة مهملات قريبة."] },
        { crime: "تم تسريب امتحان الفيزياء للثانوية العامة.", suspect_roles: ["مدرس فيزياء مشهور 👨‍🏫", "موظف كبير بوزارة التعليم 🏛️", "عامل في المطبعة السرية 🖨️", "صاحب مركز دروس خصوصية كبير 🏢", "طالب متفوق 🎓", "ولي أمر أحد الطلاب 👨‍👩‍👧", "هاكر متخصص في اختراق الأنظمة التعليمية 💻", "موجه المادة 🧐", "فني صيانة في كنترول الامتحانات 🔧", "حارس أمن 🛡️"], clues: ["تم تداول صور الامتحان عبر جروبات تليجرام مغلقة.", "الورق المستخدم في النسخة المسربة هو نفس نوع ورق الامتحانات الرسمي.", "تم رصد تحويل مالي كبير لحساب أحد المشتبه بهم."] },
        { crime: "تم تلويث خزان مياه رئيسي في قرية سياحية بالجونة.", suspect_roles: ["مدير القرية 🏨", "مهندس محطة تحلية مياه 💧", "عامل صيانة 🔧", "صاحب شركة سياحة منافسة 😠", "نزيل غاضب في الفندق 😡", "خبير بيئي 🌳", "مسؤول جودة مياه 🔬", "غواص يقوم بصيانة الخزانات 🤿", "مورد مواد كيميائية ⚗️", "حارس أمن 🛡️"], clues: ["تم العثور على بقايا مادة زيتية في الخزان.", "قفل غرفة التحكم في المضخات تم كسره.", "أحد المشتبه بهم اشتكى من فواتير المياه المرتفعة مؤخرًا."] },
        { crime: "تمت سرقة مجموعة سجاد يدوي عجمي من محل في خان الخليلي.", suspect_roles: ["صاحب المحل 👳", "عامل في المحل 🧑‍🔧", "تاجر سجاد منافس 😠", "جامع تحف ثري 💰", "مرشد سياحي 🗣️", "خبير تقييم سجاد 🧐", "وسيط بيع 🤝", "حارس أمن ليلي في الخان 🔦", "سائق شاحنة نقل 🚚", "صاحب ورشة تنظيف سجاد 🧼"], clues: ["تمت السرقة ليلاً دون كسر الأقفال.", "أحد المشتبه بهم كان على علم بموعد وصول الشحنة الجديدة.", "تم رصد سيارة نقل تغادر المنطقة في وقت متأخر من الليل."] },
        { crime: "تم تخريب منصة عرض شركة كبرى في معرض القاهرة الدولي للكتاب.", suspect_roles: ["مدير دار نشر منافسة 😠", "مصمم ديكور الجناح 🎨", "عامل تركيبات 🔧", "مؤلف متعاقد مع الدار ✍️", "مسؤول تسويق 📈", "حارس أمن ليلي 🛡️", "منظم بالمعرض 📋", "كهربائي ⚡", "مدون كتب (بوكتيوبر) 🎥", "زائر للمعرض 🚶‍♂️"], clues: ["تم قطع كابلات شاشات العرض الرئيسية.", "تم رش مادة لاصقة على أغلفة الكتب الجديدة.", "أحد المشتبه بهم تشاجر مع مدير الدار بسبب خلاف مالي."] },
        { crime: "تمت سرقة وصفة حواوشي سرية من مطعم شهير بالإسكندرية.", suspect_roles: ["الشيف (المعلم) 👨‍🍳", "مساعد الشيف 🔪", "جزار يورد اللحم للمطعم 🥩", "صاحب مطعم منافس 😠", "مورد توابل 🌶️", "عامل نظافة 🧹", "زبون دائم 🧑", "سائق توصيل الطلبات 🛵", "فني صيانة أفران 🔥", "مدير الفرع 💼"], clues: ["اختفى دفتر الملاحظات الخاص بالوصفات.", "تم العثور على أثر لنوع بهار غير مستخدم في المطعم.", "أحد المشتبه بهم حاول شراء الوصفة بمبلغ كبير وفشل."] },
        { crime: "تم استبدال تصميم فستان لمصممة أزياء مصرية قبل عرضه في أسبوع الموضة.", suspect_roles: ["المصممة نفسها 👗", "مساعدتها الأولى 👩‍🎨", "عارضة أزياء رئيسية 💃", "مصمم أزياء منافس 😠", "خياطة في الورشة 🧵", "منسق العرض 📋", "صحفي موضة ✍️", "راعٍ للعرض 💰", "مصفف شعر 💇‍♀️", "خبير أقمشة ✂️"], clues: ["التصميم البديل كان يستخدم أقمشة أرخص.", "تم الوصول إلى رسومات التصميم على الكمبيوتر المحمول.", "أحد المشتبه بهم كان يغار من نجاح المصممة."] },
        { crime: "تمت سرقة عود نادر مصنوع يدويًا من ورشة صانع أعواد شهير.", suspect_roles: ["صانع العود (الأسطى) 🎶", "مساعده في الورشة 👨‍🔧", "موسيقي وعازف عود شهير 🎻", "جامع آلات موسيقية 💰", "طالب يتعلم العزف 🎓", "تاجر خشب متخصص 🌳", "زبون ألغى طلبية مؤخرًا 😠", "مرمم آلات موسيقية 🛠️", "صديق مقرب للأسطى 🤝", "صاحب محل موسيقى 🎸"], clues: ["تمت السرقة في وقت كان فيه الأسطى مريضًا.", "لم يتم سرقة أي آلات أخرى.", "أحد المشتبه بهم لديه معرفة دقيقة بقيمة هذا العود بالتحديد."] },
        { crime: "تم تشويه جدارية فرعونية حديثة في محطة مترو أنفاق جديدة.", suspect_roles: ["فنان تشكيلي منافس 🎨", "مهندس بالمشروع 🏗️", "عامل بناء 👷", "خبير آثار 🧐", "ناشط يرى أن الجدارية لا تمثل الفن المصري 😠", "حارس أمن بالمحطة 🛡️", "طالب فنون تطبيقية 🎓", "صحفي فني 📰", "موظف في شركة الإعلانات 📢", "مرشد سياحي 🗣️"], clues: ["تم استخدام بخاخات طلاء (سبراي) لتشويه الرسومات.", "تم العثور على قناع واقٍ في سلة مهملات قريبة.", "أحد المشتبه بهم كتب منشورات على فيسبوك تنتقد الجدارية."] },
        { crime: "تم نشر إشاعة عن بيع فندق تاريخي في الأقصر وتحويله إلى مول تجاري.", suspect_roles: ["مالك الفندق 🏨", "مدير الفندق 👨‍💼", "سمسار عقارات 🏘️", "مستثمر يسعى لشراء الفندق 💰", "موظف استقبال قديم 😠", "مرشد سياحي 🗺️", "صحفي محلي ✍️", "عضو مجلس مدينة 🏛️", "مقاول ترميمات 🛠️", "صاحب بازار مجاور 🏺"], clues: ["تم تسريب عقد بيع مزيف للصحافة.", "الهدف من الإشاعة كان تخفيض سعر الفندق.", "أحد المشتبه بهم كان يحاول شراء الفندق بسعر أقل."] },
        { crime: "تمت سرقة خلطة 'معسل' جديدة من مصنع تبغ شهير.", suspect_roles: ["خبير خلطات التبغ 👃", "مدير الإنتاج 🏭", "عامل في خط التعبئة 📦", "مهندس كيميائي ⚗️", "صاحب مصنع منافس 😠", "مورد دبس السكر 🍯", "مسؤول جودة 📋", "سائق شاحنة توزيع 🚚", "صاحب مقهى كبير ☕", "مسؤول تصدير 🚢"], clues: ["تمت سرقة عينات من الخلطة النهائية.", "تم العثور على وصفة مكتوبة برموز غريبة.", "أحد المشتبه بهم لديه معرفة عميقة بعملية التصنيع."] },
        { crime: "تمت إقامة حفرة تنقيب عن آثار بشكل سري أسفل منزل في حي الجمالية.", suspect_roles: ["صاحب المنزل 🏠", "مقاول بناء 👷", "تاجر آثار 🏺", "خبير جيولوجي 🗿", "عامل حفر ⛏️", "جار مقرب 👀", "سمسار عقارات 🔑", "شيخ الحارة 👳", "موظف في هيئة الآثار 🏛️", "كهربائي ⚡"], clues: ["تم سماع أصوات حفر خافتة في الليل.", "تم العثور على كميات كبيرة من التراب في مكان غير متوقع.", "أحد المشتبه بهم اشترى أدوات حفر متقدمة مؤخرًا."] },
        { crime: "تم تخريب نظام التكييف المركزي في سينما بوسط البلد في أول أيام عرض فيلم عيد.", suspect_roles: ["مدير السينما 🎬", "فني تكييف 🔧", "مشغل أفلام 📽️", "صاحب سينما منافسة 😠", "بائع فشار 🍿", "حارس أمن 🛡️", "عامل نظافة 🧹", "كهربائي ⚡", "متفرج غاضب 😡", "مسؤول حجوزات 🎟️"], clues: ["تم فصل قاطع الدائرة الكهربائية الرئيسي للتكييف.", "تم العثور على بصمات أصابع على لوحة التحكم.", "أحد المشتبه بهم كان يشتكي من أن السينما دائمًا مزدحمة."] },
        { crime: "تم استبدال شحنة قطن مصري طويل التيلة بأخرى رديئة الجودة في ميناء دمياط.", suspect_roles: ["مُصدّر القطن 🚢", "مراقب جودة 📋", "مسؤول الجمارك 👮‍♂️", "وسيط شحن 🚚", "صاحب مصنع نسيج 🏭", "عامل في الميناء 👷", "سائق شاحنة نقل 🚛", "خبير منسوجات 🧐", "مترجم 🗣️", "حارس أمن المستودع 🛡️"], clues: ["تم التلاعب في أوراق الشحنة الرسمية.", "تم العثور على بالة قطن من النوع الأصلي ممزقة ومخبأة.", "أحد المشتبه بهم لديه علاقات بشركات نسيج في الخارج."] }
    ];

    const BYSTANDER_ROLES = [
        "بوَّاب 🧹", "بقَّال 🧃", "حلَّاق 💈", "سايس 🚗", "تاجر 🧳", "طالب 📚", "سائق ميكروباص 🚌", "صاحب كشك 🏪"
    ];
    
    const MIN_PLAYERS = 3;
    const MIN_PLAYERS_FOR_ACCOMPLICE = 6;

    // --- Game State ---
    let players = [];
    let currentJudgeIndex = -1;
    let criminalIndex = -1;
    let accompliceIndex = -1;
    
    let currentScenario = {};
    let roundNumber = 0;
    let roleRevealIndex = 0;
    let totalRounds = 5;
    let revealedCluesCount = 0;
    let investigationTime = 1; // Default to 1 minute
    let timerInterval = null;
    let usedScenarioIndices = []; // To ensure unique scenarios per game

    // --- DOM Elements ---
    const screens = {
        splash: document.getElementById('screen-splash'),
        setup: document.getElementById('screen-setup'),
        crimeInfo: document.getElementById('screen-crime-info'),
        investigation: document.getElementById('screen-investigation'),
        roleReveal: document.getElementById('screen-role-reveal'),
        judge: document.getElementById('screen-judge'),
        result: document.getElementById('screen-result'),
        gameOver: document.getElementById('screen-game-over'),
    };
    const playerNameInput = document.getElementById('playerNameInput');
    const playerListSetup = document.getElementById('player-list-setup');
    const startGameBtn = document.getElementById('startGameBtn');
    const errorMessage = document.getElementById('error-message');
    const timerDisplay = document.getElementById('timer-display');
    const rulesModal = document.getElementById('rules-modal');
    const confirmModal = document.getElementById('confirm-modal');
    const confirmMessage = document.getElementById('confirm-message');
    const confirmYesBtn = document.getElementById('confirm-yes-btn');
    const confirmNoBtn = document.getElementById('confirm-no-btn');
    const roleRevealScreen = document.getElementById('screen-role-reveal');
    const partnerInfoDiv = document.getElementById('partner-info');
    const partnerNameEl = document.getElementById('partnerName');
    
    // --- Global Functions ---
    window.showScreen = (screenName) => {
        Object.values(screens).forEach(screen => {
            if(screen) screen.classList.add('hidden');
        });
        if (screens[screenName]) {
            screens[screenName].classList.remove('hidden');
        }
    };

    window.toggleRules = (show) => {
        if (show) {
            rulesModal.classList.remove('hidden');
        } else {
            rulesModal.classList.add('hidden');
        }
    };
    
    // --- Custom Confirm Modal Logic ---
    let onConfirmCallback = null;
    window.showConfirm = (message, callback) => {
        confirmMessage.textContent = message;
        onConfirmCallback = callback;
        confirmModal.classList.remove('hidden');
    };

    confirmYesBtn.addEventListener('click', () => {
        if (onConfirmCallback) {
            onConfirmCallback();
        }
        confirmModal.classList.add('hidden');
    });

    confirmNoBtn.addEventListener('click', () => {
        onConfirmCallback = null;
        confirmModal.classList.add('hidden');
    });


    window.addPlayer = () => {
        const name = playerNameInput.value.trim();
        if (!name) { errorMessage.textContent = 'الرجاء إدخال اسم.'; return; }
        if (players.some(p => p.name === name)) { errorMessage.textContent = 'هذا الاسم مستخدم بالفعل.'; return; }
        players.push({ name, score: 0 });
        playerNameInput.value = '';
        errorMessage.textContent = '';
        updatePlayerListUI();
        if (players.length >= MIN_PLAYERS) startGameBtn.disabled = false;
        playerNameInput.focus();
    };

    window.selectRounds = (num) => {
        totalRounds = num;
        document.querySelectorAll('#rounds-selection .btn-round').forEach(button => {
            button.classList.toggle('selected', parseInt(button.textContent) === num);
        });
    };
    
    window.selectTime = (minutes) => {
        investigationTime = minutes;
        document.querySelectorAll('#time-selection .btn-round').forEach(button => {
            button.classList.toggle('selected', parseInt(button.textContent) === minutes);
        });
        updateTimerDisplay(investigationTime * 60);
    };

    window.removePlayer = (index) => {
        players.splice(index, 1);
        updatePlayerListUI();
        if (players.length < MIN_PLAYERS) startGameBtn.disabled = true;
    };

    window.beginGame = () => {
        if (players.length < MIN_PLAYERS) return;
        players.forEach(p => p.score = 0);
        roundNumber = 0;
        usedScenarioIndices = []; // Reset used scenarios for the new game
        startNewRound();
    };
    
    window.showRoleRevealScreen = () => {
        roleRevealIndex = 0;
        setupRoleReveal();
        showScreen('roleReveal');
    };
    
    window.revealClue = (clueNumber) => {
        const clueTextEl = document.getElementById(`clueText${clueNumber}`);
        const clueBtnEl = document.getElementById(`revealClueBtn${clueNumber}`);

        clueTextEl.textContent = currentScenario.clues[clueNumber - 1];
        clueTextEl.classList.remove('hidden');
        clueBtnEl.disabled = true;

        if (!timerInterval) { 
            startTimer();
        }

        revealedCluesCount++;
        
        // Show the "Go to Judge" button after the first clue is revealed
        document.getElementById('goToJudgeBtn').classList.remove('hidden');
    };
    
    window.showJudgeScreen = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        document.getElementById('judge-title').textContent = `أيها القاضي ${players[currentJudgeIndex].name}، أصدر حكمك!`;
        renderJudgeOptions();
        showScreen('judge');
    }

    window.revealRole = () => {
        const player = players[roleRevealIndex];
        
        // Reset background and show/hide extra info
        roleRevealScreen.className = 'screen text-center space-y-4'; 
        partnerInfoDiv.classList.add('hidden');

        document.getElementById('role-reveal-container').classList.add('hidden');
        const roleDisplay = document.getElementById('role-display-container');
        roleDisplay.classList.remove('hidden');
        
        const roleTextEl = document.getElementById('playerRole');
        roleTextEl.textContent = player.role;
        // Restore original text color logic
        roleTextEl.className = 'text-3xl font-bold '; 
        
        if (player.role.includes("المجرم") || player.role.includes("الشريك")) {
             roleTextEl.classList.add("text-red-500");
        } else if (player.role.includes("القاضي")) {
            roleTextEl.classList.add("text-blue-600");
        } else {
            roleTextEl.classList.add("text-gray-700"); // Default color for innocents
        }

        // Show extra info if needed
        if (player.role.includes("المجرم")) {
            if(accompliceIndex !== -1) {
                partnerNameEl.textContent = players[accompliceIndex].name;
                partnerInfoDiv.classList.remove('hidden');
            }
        } else if (player.role.includes("الشريك")) {
            partnerNameEl.textContent = players[criminalIndex].name;
            partnerInfoDiv.classList.remove('hidden');
        }
    };

    window.hideRole = () => {
        roleRevealIndex++;
        setupRoleReveal();
    };

    window.judge = (accusedIndex) => {
        const verdictEl = document.getElementById('verdict');
        let criminalRevealText = `المجرم الحقيقي كان: ${players[criminalIndex].name} - ${players[criminalIndex].base_role}.`;
        if (accompliceIndex !== -1) {
            criminalRevealText += ` وشريكه كان: ${players[accompliceIndex].name}.`;
        }
        
        const isCriminalCaught = (accusedIndex === criminalIndex || accusedIndex === accompliceIndex);

        if (isCriminalCaught) {
            verdictEl.textContent = `صحيح! ${players[accusedIndex].name} كان متورطاً ✅`;
            verdictEl.className = "text-xl font-bold text-green-500";
            
            // Judge scoring
            if (revealedCluesCount === 1) players[currentJudgeIndex].score += 5;
            else if (revealedCluesCount === 2) players[currentJudgeIndex].score += 4;
            else players[currentJudgeIndex].score += 3;
            
            // Innocents scoring
            players.forEach((p, i) => {
                if (i !== currentJudgeIndex && i !== criminalIndex && i !== accompliceIndex) {
                    p.score += 2;
                }
            });

        } else {
            verdictEl.textContent = `خطأ! ${players[accusedIndex].name} كان بريئاً ❌`;
            verdictEl.className = "text-xl font-bold text-red-500";
            
            // Falsely accused gets points
            players[accusedIndex].score += 2; 

            // Criminal team gets points
            players[criminalIndex].score += 3;
            if (accompliceIndex !== -1) {
                players[accompliceIndex].score += 3;
            }
        }
        document.getElementById('criminal-reveal').textContent = criminalRevealText;
        renderScoreBoard();
        showScreen('result');
    };

    window.nextRound = () => {
        if (roundNumber >= totalRounds) {
            showGameOver();
        } else {
            startNewRound();
        }
    };
    
    // Exit game confirmation logic
    window.exitGameConfirm = () => {
        showConfirm("هل أنت متأكد؟ ستنتهي اللعبة الحالية وتعود لقائمة الإعدادات بنفس اللاعبين.", () => {
            if (timerInterval) {
                 clearInterval(timerInterval);
                 timerInterval = null;
            }
            players.forEach(p => p.score = 0);
            usedScenarioIndices = []; // Reset used scenarios for true randomness on replay
            updatePlayerListUI();
            startGameBtn.disabled = (players.length < MIN_PLAYERS);
            showScreen('setup');
        });
    };
    
    window.restartGame = () => {
        showConfirm("هل أنت متأكد؟ سيتم حذف جميع اللاعبين والبدء من جديد.", () => {
            if (timerInterval) {
                 clearInterval(timerInterval);
                 timerInterval = null;
            }
            players = [];
            usedScenarioIndices = []; // Also reset here
            updatePlayerListUI();
            startGameBtn.disabled = true;
            selectRounds(5);
            selectTime(1);
            showScreen('splash');
        });
    };
    
    // --- Internal Functions ---
    function updatePlayerListUI() {
        playerListSetup.innerHTML = '';
        players.forEach((player, index) => {
            const playerDiv = document.createElement('div');
            playerDiv.className = 'player-list-item flex justify-between items-center';
            playerDiv.innerHTML = `<span>${player.name}</span> <button onclick="removePlayer(${index})" class="remove-btn">X</button>`;
            playerListSetup.appendChild(playerDiv);
        });
    }

    function startNewRound() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        roundNumber++;
        accompliceIndex = -1; // Reset special roles
        
        let availableIndices = SCENARIOS.map((_, i) => i).filter(i => !usedScenarioIndices.includes(i));
        
        if (availableIndices.length === 0) {
            console.log("All scenarios used! Resetting list.");
            usedScenarioIndices = [];
            availableIndices = SCENARIOS.map((_, i) => i);
        }
        
        const scenarioIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        usedScenarioIndices.push(scenarioIndex);
        
        const originalScenario = SCENARIOS[scenarioIndex];
        currentScenario = {
            ...originalScenario,
            suspect_roles: [...originalScenario.suspect_roles],
            clues: [...originalScenario.clues].sort(() => 0.5 - Math.random())
        };

        // --- ROLE ASSIGNMENT LOGIC ---
        let playerIndices = players.map((_,i) => i);
        
        // Assign Judge
        currentJudgeIndex = playerIndices.splice(Math.floor(Math.random() * playerIndices.length), 1)[0];
        players[currentJudgeIndex].role = "القاضي 👨‍⚖️";
        players[currentJudgeIndex].base_role = "القاضي";

        // Assign Criminal
        criminalIndex = playerIndices.splice(Math.floor(Math.random() * playerIndices.length), 1)[0];
        
        // Assign Accomplice if player count is sufficient
        if(players.length >= MIN_PLAYERS_FOR_ACCOMPLICE) {
            accompliceIndex = playerIndices.splice(Math.floor(Math.random() * playerIndices.length), 1)[0];
        }

        // Assign text roles and special info
        let availableRoles = [...currentScenario.suspect_roles].sort(() => 0.5 - Math.random());

        players.forEach((player, i) => {
            if (i === criminalIndex) {
                player.role = `${availableRoles.pop()} (المجرم 🦹‍♂️)`;
                player.base_role = player.role.replace(" (المجرم 🦹‍♂️)", "");
            } else if (i === accompliceIndex) {
                player.role = `شريك المجرم 🕵️`;
                player.base_role = "شريك المجرم";
            } else if (i !== currentJudgeIndex) {
                player.role = availableRoles.pop() || "شاهد عيان 👁️";
                player.base_role = player.role;
            }
        });

        document.getElementById('round-title-crime').textContent = `الجولة ${roundNumber} من ${totalRounds}`;
        document.getElementById('judge-announcement').innerHTML = `<span class="font-bold text-yellow-400">${players[currentJudgeIndex].name}</span>, أنت القاضي!`;
        document.getElementById('crime-story').textContent = currentScenario.crime;
        
        showScreen('crimeInfo');
    }

    function setupRoleReveal() {
        const roleRevealContainer = document.getElementById('role-reveal-container');
        const roleDisplayContainer = document.getElementById('role-display-container');
        
        roleDisplayContainer.classList.add('hidden');
        roleRevealContainer.classList.remove('hidden');
        
        if (roleRevealIndex >= players.length) {
            setupInvestigationScreen();
            showScreen('investigation');
        } else {
            document.getElementById('currentPlayerName').textContent = players[roleRevealIndex].name;
        }
    }
    
    function setupInvestigationScreen() {
        revealedCluesCount = 0;
        document.getElementById('crime-story-investigation').textContent = currentScenario.crime;
        updateTimerDisplay(investigationTime * 60);
        
        for(let i = 1; i <= 3; i++) {
            document.getElementById(`clueText${i}`).classList.add('hidden');
            document.getElementById(`revealClueBtn${i}`).disabled = false;
        }
        document.getElementById('goToJudgeBtn').classList.add('hidden');
    }
    
    function startTimer() {
        let timeInSeconds = investigationTime * 60;
        
        timerInterval = setInterval(() => {
            timeInSeconds--;
            updateTimerDisplay(timeInSeconds);

            if (timeInSeconds <= 0) {
                showJudgeScreen();
            }
        }, 1000);
    }

    function updateTimerDisplay(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function renderJudgeOptions(){
        const convictionList = document.getElementById('conviction-list');
        convictionList.innerHTML = '';
        players.forEach((player, index) => {
            if (index === currentJudgeIndex) return;
            const btn = document.createElement('button');
            btn.className = 'btn btn-danger text-lg';
            btn.textContent = `إدانة ${player.name}`;
            btn.onclick = () => judge(index);
            convictionList.appendChild(btn);
        });
    }

    function renderScoreBoard() {
        const board = document.getElementById("scoreBoard");
        board.innerHTML = '<h3 class="text-lg font-bold text-center mb-2">لوحة النقاط</h3>';
        const sortedPlayers = [...players].sort((a,b) => b.score - a.score);
        sortedPlayers.forEach(p => {
            board.innerHTML += `<div class="flex justify-between p-1"><span>${p.name}</span> <span class="font-bold text-yellow-500">${p.score} نقطة</span></div>`;
        });
    }

    function showGameOver() {
        const finalScores = document.getElementById('final-scores');
        finalScores.innerHTML = '';
        const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
        
        sortedPlayers.forEach((p, index) => {
            const scoreDiv = document.createElement('div');
            let medal = "";
            if(index === 0) medal = "🥇";
            else if(index === 1) medal = "🥈";
            else if(index === 2) medal = "🥉";
            scoreDiv.className = 'text-xl p-2 bg-gray-200 rounded-lg flex justify-between border-2 border-black';
            scoreDiv.innerHTML = `<span>${medal} ${p.name}</span> <span class="font-bold text-blue-700">${p.score} نقطة</span>`;
            finalScores.appendChild(scoreDiv);
        });
        
        showScreen('gameOver');
    }
    
    playerNameInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') addPlayer();
    });
    
    // Initialize default selections
    selectTime(1);
    selectRounds(5);
    showScreen('splash');
});
