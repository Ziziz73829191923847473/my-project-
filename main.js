
    // Тексты для мультиязычности
    const translations = {
        ru: {
            service_title: "Миграционная служба",
            service_sub: "Республики Таджикистан",
            menu_main: "Главная",
            menu_history: "История",
            menu_holidays: "Праздники",
            menu_gallery: "Галерея",
            menu_anthem: "Гимн",
            menu_register: "Подача заявки",
            menu_apps: "Заявки",
            hero_subtitle: "ГОСУДАРСТВЕННАЯ ИНФОРМАЦИОННАЯ СИСТЕМА",
            hero_h1_1: "Миграционный учет",
            hero_h1_2: "Таджикистана",
            hero_desc: "Официальный информационный портал миграционной службы. Здесь вы можете ознакомиться с историей, законодательством, культурой Республики Таджикистан и подать документы на учет.",
            btn_apply: "Перейти к подаче заявки ➔",
            info_card_title: "Единый реестр",
            info_card_desc: "Электронная система обеспечения прозрачности и удобства миграционного учета в Республики Таджикистан.",
            sec_history_sub: "ВЕЛИКОЕ НАСЛЕДИЕ",
            sec_history_title: "История и Культура",
            sec_holidays_sub: "КАЛЕНДАРЬ",
            sec_holidays_title: "Государственные Праздники",
            footer_contacts: "Контакты",
            footer_info: "Информация",
            h7_title: "День матери",
            h7_desc: "Официально отмечается в один день с Международным женским днем для почитания женщин и матерей.",
            h8_title: "День фалака",
            h8_desc: "Праздник традиционного таджикского музыкального жанра и культурного наследия.",
            h6_title: "День Конституции",
            h6_desc: "Празднование принятия основного закона Республики Таджикистан, гарантирующего права и свободы граждан.",
            hist_h3: "Древняя земля, великие цивилизации и современный Таджикистан",
            hist_text: `
                    <p style="margin-bottom: 12px;">Таджикистан — страна с глубокими историческими корнями и богатейшим культурным наследием. На этих землях процветали древнейшие государственные образования и цивилизации Центральной Азии: Согдиана, Бактрия, Хорезм и Маргиана. Проходящий через эту территорию Великий шелковый путь способствовал культурному и экономическому обмену между Востоком и Западом.</p>
                    <p style="margin-bottom: 12px;">Особое место занимает эпоха правления династии Саманидов (IX–X века) — золотой век науки, литературы и архитектуры. В этот период сформировался классический таджикский язык и закладывались основы национальной идентичности. Бухара и Самарканд стали крупнейшими мировыми центрами науки, где творили Абу Али ибн Сина (Авиценна), Абуабдулло Рудаки, Фирдоуси и Аль-Бируни.</p>
                    <p style="margin-bottom: 12px;">Сквозь века и иноземные завоевания таджикский народ сумел сохранить свой язык, самобытную культуру и традиции. В XX веке была образована Таджикская ССР, заложившая основу современной индустрии, науки и образования.</p>
                    <p>9 сентября 1991 года была провозглашена независимость Республики Таджикистан. Сегодня суверенный Таджикистан — это динамично развивающееся государство, сочетающее глубокое историческое наследие с современными электронными и цифровыми технологиями.</p>
                `
        },
        tj: {
            service_title: "Хизмати муҳоҷират",
            service_sub: "Ҷумҳурии Тоҷикистон",
            menu_main: "Асосӣ",
            menu_history: "Таърих",
            menu_holidays: "Идҳо",
            menu_gallery: "Нигористон",
            menu_anthem: "Суруд",
            menu_register: "Пешниҳоди ариза",
            menu_apps: "Аризаҳо",
            hero_subtitle: "СИСТЕМАИ ИТТИЛООТИИ ДАВЛАТӢ",
            hero_h1_1: "Баראсмиятдарории",
            hero_h1_2: "Муҳоҷирати Тоҷикистон",
            hero_desc: "Портали расмии иттилоотии хизмати муҳоҷират. Дар ин ҷо шумо метавонед бо таърих, қонунгузорӣ ва фарҳанги Ҷумҳурии Тоҷикистон шинос шавед.",
            btn_apply: "Гузариш ба пешниҳоди ариза ➔",
            info_card_title: "Реестри ягона",
            info_card_desc: "Системаи электронии таъмини шаффофият ва қулайии баҳисобгирии муҳоҷират.",
            sec_history_sub: "МЕРОСИ БУЗУРГ",
            sec_history_title: "Таърих ва Фарҳанг",
            sec_holidays_sub: "ТАКВИМ",
            sec_holidays_title: "Идҳои Давлатӣ",
            footer_contacts: "Тамос",
            footer_info: "Иттилоот",
            h7_title: "Рӯзи Модар",
            h7_desc: "Расан дар як рӯз бо Рӯзи байналмилалии занон барои эҳтироми занон ва модарон ҷашн гирифта мешавад.",
            h8_title: "Рӯзи Фалак",
            h8_desc: "Ҷашни жанри мусиқии анъанавии тоҷик ва мероси фарҳангӣ.",
            h6_title: "Рӯзи Конститутсия",
            h6_desc: "Ҷашни қабули қонуни асосии Ҷумҳурии Тоҷикистон, ки ҳуқуқ ва озодиҳои шаҳрвандонро кафолат медиҳад.",
            hist_h3: "Замини аҷдодӣ, тамаддунҳои бузург ва Тоҷикистони муосир",
            hist_text: `
                    <p style="margin-bottom: 12px;">Тоҷикистон кишварест дорои решаҳои амиқи таърихӣ ва мероси ғании фарҳангӣ. Дар ин заминҳо давлатҳо ва тамаддунҳои қадимитарини Осиёи Марказӣ: Суғд, Бохтар, Хоразм ва Марғиён шукуфон буданд. Шоҳроҳи бузурги абрешим, ки аз ин ҳудуд мегузашт, ба мубодилаи фарҳангӣ ва иқтисодии байни Шарқу Ғарб мусоидат мекард.</p>
                    <p style="margin-bottom: 12px;">Ҷои махсусро давраи ҳукмронии сулолаи Сомониён (асрҳои IX–X) — асри тиллоии илм, адабиёт ва меъморӣ ишғол мекунад. Дар ин давра забони классикии тоҷикӣ шакл гирифта, таҳкурсии ҳувияти миллӣ гузошта шуд. Бухоро ва Самарқанд бузургтарин марказҳои илмии ҷаҳон шуданд, ки дар онҳо Абуалӣ ибни Сино, Абуабдуллоҳи Рӯдакӣ, Фирдавсӣ ва Берунӣ эҷод кардаанд.</p>
                    <p style="margin-bottom: 12px;">Пайваста аз асрҳо ва истилоҳои аҷнабӣ халқи тоҷик тавонист забон, фарҳанг ва анъанаҳои худтаъсиси худро ҳифз намояд. Дар асри XX ҶШС Тоҷикистон ташкил ёфт, ки таҳкурсии саноат, илм ва маорифи муосирро гузошт.</p>
                    <p>9 сентябри соли 1991 Истиқлолияти Ҷумҳурии Тоҷикистон эълон карда шуд. Имрӯз Тоҷикистони соҳибистиқлол давлати босуръат рушдёбанда мебошад, ки мероси амиқи таърихиро бо технологияҳои муосири электронӣ ва рақамӣ пайванд медиҳад.</p>
                `
        },
        en: {
            service_title: "Migration Service",
            service_sub: "Republic of Tajikistan",
            menu_main: "Home",
            menu_history: "History",
            menu_holidays: "Holidays",
            menu_gallery: "Gallery",
            menu_anthem: "Anthem",
            menu_register: "Submit Application",
            menu_apps: "Applications",
            hero_subtitle: "STATE INFORMATION SYSTEM",
            hero_h1_1: "Migration Control",
            hero_h1_2: "of Tajikistan",
            hero_desc: "Official information portal of the migration service. Learn about the history, laws, and culture of the Republic of Tajikistan.",
            btn_apply: "Go to application form ➔",
            info_card_title: "Unified Register",
            info_card_desc: "Electronic system ensuring transparency and efficiency in migration tracking.",
            sec_history_sub: "GREAT HERITAGE",
            sec_history_title: "History & Culture",
            sec_holidays_sub: "CALENDAR",
            sec_holidays_title: "National Holidays",
            footer_contacts: "Contacts",
            footer_info: "Information",
            h7_title: "Mother's Day",
            h7_desc: "Officially celebrated on International Women's Day to honor women and mothers.",
            h8_title: "Falak Day",
            h8_desc: "Celebration of traditional Tajik musical genre and cultural heritage.",
            h6_title: "Constitution Day",
            h6_desc: "Celebration of the adoption of the fundamental law of the Republic of Tajikistan, guaranteeing human rights and freedoms.",
            hist_h3: "Ancient Land, Great Civilizations, and Modern Tajikistan",
            hist_text: `
                <p style="margin-bottom: 12px;">Tajikistan is a country with deep historical roots and a rich cultural heritage. Ancient state formations and civilizations of Central Asia flourished on these lands: Sogdiana, Bactria, Khwarazm, and Margiana. The Silk Road passing through this territory facilitated cultural and economic exchange between East and West.</p>
                <p style="margin-bottom: 12px;">A special place is occupied by the Samanid dynasty era (9th–10th centuries) — the golden age of science, literature, and architecture. During this period, the classical Tajik language was formed and the foundations of national identity were laid. Bukhara and Samarkand became major world centers of science.</p>
                <p style="margin-bottom: 12px;">Through centuries of foreign conquests, the Tajik people managed to preserve their language, unique culture, and traditions. In the 20th century, the Tajik SSR was established, laying the foundation for modern industry, science, and education.</p>
                <p>On September 9, 1991, the independence of the Republic of Tajikistan was proclaimed. Today, sovereign Tajikistan is a dynamically developing state that combines deep historical heritage with modern electronic and digital technologies.</p>
            `
        }
    };

    // Функция переключения языков
   function setLanguage(lang) {
        document.querySelectorAll('.lang-switch').forEach(btn => btn.classList.remove('active'));
        if (event && event.target) {
            event.target.classList.add('active');
        }

        const elements = document.querySelectorAll('[data-lang-key]');
        elements.forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (translations[lang] && translations[lang][key]) {
                // Используем innerHTML, чтобы сохранять теги <p> и переносы
                el.innerHTML = translations[lang][key];
            }
        });
    }