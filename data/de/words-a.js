/**
 * data/de/words-a.js
 * Từ vựng tiếng Đức A1 (phần A: bài 4–16), PolyLingo tự soạn theo chủ đề của khung A1 (CEFR).
 * Mỗi dòng: mạo từ | từ | dạng biến đổi | nghĩa | từ loại | câu ví dụ | nghĩa câu
 *  - Mạo từ: der (giống đực), die (giống cái), das (giống trung), pl (chỉ có số nhiều), để trống nếu không phải danh từ có mạo từ.
 *  - Dạng biến đổi: danh từ ghi số nhiều ("-" nếu không có); động từ ghi "ngôi er hiện tại; Perfekt"
 *    (vd "fährt; ist gefahren", động từ tách ghi "steht auf; ist aufgestanden"). Có thể thêm "; du …" khi ngôi du bất quy tắc.
 *  - Từ loại: n danh từ, v động từ, adj tính từ, adv trạng từ, pron đại từ, poss từ sở hữu, art mạo từ,
 *    prep giới từ, num số, q từ để hỏi, conj liên từ, exp câu/cụm cố định.
 * "#L4 ..." mở đầu nhóm từ của bài 4. Chia động từ do data/de/de-core.js tự tính.
 */
if (typeof window === 'undefined') { global.window = global; }

window.DE_WORDS_RAW = (window.DE_WORDS_RAW || []).concat([`
#L4 Chào hỏi và giới thiệu
|hallo||xin chào|exp|Hallo, ich bin Anna.|Xin chào, mình là Anna.
|guten Morgen||chào buổi sáng|exp|Guten Morgen, Frau Weber!|Chào buổi sáng, bà Weber!
|guten Tag||xin chào (ban ngày, lịch sự)|exp|Guten Tag, Herr Schmidt.|Xin chào ông Schmidt.
|guten Abend||chào buổi tối|exp|Guten Abend, wie geht es Ihnen?|Chào buổi tối, ông/bà có khỏe không?
|gute Nacht||chúc ngủ ngon|exp|Gute Nacht, bis morgen!|Chúc ngủ ngon, mai gặp lại!
|tschüss||tạm biệt (thân mật)|exp|Tschüss, Lukas!|Tạm biệt Lukas!
|auf Wiedersehen||tạm biệt (lịch sự)|exp|Auf Wiedersehen und vielen Dank!|Tạm biệt và cảm ơn nhiều!
|danke||cảm ơn|exp|Danke, mir geht es gut.|Cảm ơn, tôi khỏe.
|bitte||làm ơn; xin mời; không có gì|exp|Ein Wasser, bitte.|Cho tôi một chai nước, làm ơn.
|ja||vâng, có|exp|Ja, ich bin Studentin.|Vâng, tôi là sinh viên.
|nein||không|exp|Nein, ich bin nicht Lehrer.|Không, tôi không phải giáo viên.
|Entschuldigung||xin lỗi; làm phiền một chút|exp|Entschuldigung, sind Sie Frau Berg?|Xin lỗi, bà có phải bà Berg không?
|freut mich||rất vui được gặp bạn|exp|Freut mich, ich bin Tom.|Rất vui được gặp bạn, mình là Tom.
|ich||tôi|pron|Ich bin Minh.|Tôi là Minh.
|du||bạn, cậu (thân mật)|pron|Wer bist du?|Bạn là ai?
|Sie||ông, bà, anh, chị (lịch sự)|pron|Wie heißen Sie?|Ông/bà tên là gì?
|sein|ist; ist gewesen|là, thì, ở|v|Ich bin müde.|Tôi mệt.
|heißen|heißt; hat geheißen|tên là|v|Ich heiße Lan.|Tôi tên là Lan.
der|Name|die Namen|tên|n|Mein Name ist Hoa.|Tên tôi là Hoa.
der|Vorname|die Vornamen|tên gọi|n|Mein Vorname ist Duc.|Tên gọi của tôi là Đức.
der|Familienname|die Familiennamen|họ|n|Mein Familienname ist Nguyen.|Họ của tôi là Nguyễn.
der|Herr|die Herren|ông, quý ông|n|Das ist Herr Müller.|Đây là ông Müller.
die|Frau|die Frauen|bà; người phụ nữ; vợ|n|Frau Klein ist sehr nett.|Bà Klein rất dễ mến.
|wie||như thế nào|q|Wie geht es dir?|Bạn có khỏe không?
|wer||ai|q|Wer ist das?|Đó là ai?
|gut||tốt, khỏe, giỏi|adj|Mir geht es gut.|Tôi khỏe.
|nett||dễ mến, tử tế|adj|Du bist nett.|Bạn thật dễ mến.

#L5 Đất nước và ngôn ngữ
|kommen|kommt; ist gekommen|đến|v|Ich komme aus Vietnam.|Tôi đến từ Việt Nam.
|wohnen|wohnt; hat gewohnt|sống, ở (nơi ở)|v|Wir wohnen in Berlin.|Chúng tôi sống ở Berlin.
|sprechen|spricht; hat gesprochen|nói|v|Sprichst du Deutsch?|Bạn có nói tiếng Đức không?
|lernen|lernt; hat gelernt|học|v|Ich lerne Deutsch.|Tôi học tiếng Đức.
|verstehen|versteht; hat verstanden|hiểu|v|Ich verstehe das nicht.|Tôi không hiểu cái đó.
das|Land|die Länder|đất nước; vùng quê|n|Vietnam ist ein schönes Land.|Việt Nam là một đất nước đẹp.
|Deutschland|-|nước Đức|n|Ich lebe in Deutschland.|Tôi sống ở Đức.
|Vietnam|-|Việt Nam|n|Vietnam liegt in Asien.|Việt Nam nằm ở châu Á.
|Österreich|-|nước Áo|n|Wien liegt in Österreich.|Viên nằm ở nước Áo.
die|Schweiz|-|Thụy Sĩ|n|Er kommt aus der Schweiz.|Anh ấy đến từ Thụy Sĩ.
|Deutsch|-|tiếng Đức|n|Deutsch ist nicht so schwer.|Tiếng Đức không khó lắm.
|Englisch|-|tiếng Anh|n|Sie spricht gut Englisch.|Cô ấy nói tiếng Anh giỏi.
|Vietnamesisch|-|tiếng Việt|n|Meine Mutter spricht nur Vietnamesisch.|Mẹ tôi chỉ nói tiếng Việt.
die|Sprache|die Sprachen|ngôn ngữ|n|Welche Sprachen sprechen Sie?|Ông/bà nói những ngôn ngữ nào?
die|Stadt|die Städte|thành phố|n|Hanoi ist eine große Stadt.|Hà Nội là một thành phố lớn.
|woher||từ đâu|q|Woher kommst du?|Bạn đến từ đâu?
|wo||ở đâu|q|Wo wohnen Sie?|Ông/bà sống ở đâu?
|aus||từ (nơi chốn), ra khỏi|prep|Ich bin aus Hue.|Tôi đến từ Huế.
|in||ở, trong|prep|Er wohnt in München.|Anh ấy sống ở München.
|er||anh ấy, ông ấy, nó (giống đực)|pron|Er heißt Paul.|Anh ấy tên là Paul.
|sie||cô ấy, bà ấy; họ|pron|Sie kommt aus Hamburg.|Cô ấy đến từ Hamburg.
|es||nó (giống trung)|pron|Es ist kalt.|Trời lạnh.
|wir||chúng tôi, chúng ta|pron|Wir lernen zusammen.|Chúng ta học cùng nhau.
|ihr||các bạn|pron|Woher kommt ihr?|Các bạn đến từ đâu?
|auch||cũng|adv|Ich lerne auch Deutsch.|Tôi cũng học tiếng Đức.
|und||và|conj|Ich spreche Deutsch und Englisch.|Tôi nói tiếng Đức và tiếng Anh.
|ein bisschen||một chút|adv|Ich spreche ein bisschen Deutsch.|Tôi nói được một chút tiếng Đức.

#L6 Số đếm, tuổi, số điện thoại
|null||số 0|num|Meine Nummer beginnt mit null.|Số của tôi bắt đầu bằng số 0.
|eins||số 1|num|Eins, zwei, drei, los!|Một, hai, ba, bắt đầu!
|zwei||số 2|num|Ich habe zwei Brüder.|Tôi có hai anh em trai.
|drei||số 3|num|Das kostet drei Euro.|Cái đó giá ba euro.
|vier||số 4|num|Wir sind vier Personen.|Chúng tôi có bốn người.
|fünf||số 5|num|Es ist fünf Uhr.|Bây giờ là năm giờ.
|sechs||số 6|num|Das Kind ist sechs Jahre alt.|Đứa bé sáu tuổi.
|sieben||số 7|num|Die Woche hat sieben Tage.|Một tuần có bảy ngày.
|acht||số 8|num|Der Kurs beginnt um acht.|Khóa học bắt đầu lúc tám giờ.
|neun||số 9|num|Ich wohne in Zimmer neun.|Tôi ở phòng số chín.
|zehn||số 10|num|Ich warte zehn Minuten.|Tôi đợi mười phút.
|elf||số 11|num|Mein Sohn ist elf.|Con trai tôi mười một tuổi.
|zwölf||số 12|num|Ein Jahr hat zwölf Monate.|Một năm có mười hai tháng.
|zwanzig||số 20|num|Sie ist zwanzig Jahre alt.|Cô ấy hai mươi tuổi.
|einundzwanzig||số 21|num|Er ist einundzwanzig.|Anh ấy hai mươi mốt tuổi.
|dreißig||số 30|num|Der Monat hat dreißig Tage.|Tháng này có ba mươi ngày.
|hundert||số 100|num|Das Fahrrad kostet hundert Euro.|Chiếc xe đạp giá một trăm euro.
|haben|hat; hat gehabt|có|v|Hast du Zeit?|Bạn có thời gian không?
|alt||già; cũ; (bao nhiêu) tuổi|adj|Wie alt bist du?|Bạn bao nhiêu tuổi?
|jung||trẻ|adj|Mein Lehrer ist noch jung.|Thầy giáo tôi còn trẻ.
das|Jahr|die Jahre|năm|n|Ich bin 25 Jahre alt.|Tôi 25 tuổi.
die|Nummer|die Nummern|con số, số|n|Wie ist deine Nummer?|Số của bạn là bao nhiêu?
die|Telefonnummer|die Telefonnummern|số điện thoại|n|Wie ist Ihre Telefonnummer?|Số điện thoại của ông/bà là gì?
die|Adresse|die Adressen|địa chỉ|n|Meine Adresse ist Bahnhofstraße 5.|Địa chỉ của tôi là phố Bahnhofstraße số 5.
|wie viel||bao nhiêu|q|Wie viel kostet das?|Cái này bao nhiêu tiền?
|zählen|zählt; hat gezählt|đếm|v|Das Kind zählt bis zehn.|Đứa bé đếm đến mười.

#L7 Gia đình
die|Familie|die Familien|gia đình|n|Meine Familie ist groß.|Gia đình tôi đông người.
die|Mutter|die Mütter|mẹ|n|Meine Mutter heißt Mai.|Mẹ tôi tên là Mai.
der|Vater|die Väter|bố|n|Mein Vater ist Arzt.|Bố tôi là bác sĩ.
pl|Eltern|-|bố mẹ|n|Meine Eltern wohnen in Da Nang.|Bố mẹ tôi sống ở Đà Nẵng.
der|Bruder|die Brüder|anh trai, em trai|n|Mein Bruder ist zehn.|Em trai tôi mười tuổi.
die|Schwester|die Schwestern|chị gái, em gái|n|Hast du eine Schwester?|Bạn có chị hay em gái không?
pl|Geschwister|-|anh chị em|n|Ich habe drei Geschwister.|Tôi có ba anh chị em.
der|Sohn|die Söhne|con trai|n|Ihr Sohn studiert in Köln.|Con trai bà ấy học đại học ở Köln.
die|Tochter|die Töchter|con gái|n|Meine Tochter ist fünf.|Con gái tôi năm tuổi.
das|Kind|die Kinder|đứa trẻ, con|n|Wir haben zwei Kinder.|Chúng tôi có hai con.
der|Mann|die Männer|người đàn ông; chồng|n|Ihr Mann kocht gern.|Chồng cô ấy thích nấu ăn.
die|Oma|die Omas|bà|n|Meine Oma ist achtzig.|Bà tôi tám mươi tuổi.
der|Opa|die Opas|ông|n|Der Opa spielt mit dem Kind.|Ông chơi với đứa cháu.
der|Freund|die Freunde|bạn (nam); bạn trai|n|Das ist mein Freund Tom.|Đây là Tom, bạn tôi.
die|Freundin|die Freundinnen|bạn (nữ); bạn gái|n|Meine Freundin wohnt in Bonn.|Bạn gái tôi sống ở Bonn.
|verheiratet||đã kết hôn|adj|Sind Sie verheiratet?|Ông/bà đã lập gia đình chưa?
|ledig||độc thân|adj|Nein, ich bin ledig.|Không, tôi còn độc thân.
|mein||của tôi|poss|Das ist mein Vater.|Đây là bố tôi.
|dein||của bạn|poss|Ist das deine Mutter?|Đó là mẹ bạn à?
|sein||của anh ấy|poss|Sein Bruder ist Koch.|Anh trai của anh ấy là đầu bếp.
|ihr||của cô ấy; của họ|poss|Ihre Tochter ist noch klein.|Con gái của cô ấy còn nhỏ.
|unser||của chúng tôi|poss|Unser Haus ist alt.|Nhà của chúng tôi đã cũ.
|lieben|liebt; hat geliebt|yêu|v|Ich liebe meine Familie.|Tôi yêu gia đình mình.
|leben|lebt; hat gelebt|sống|v|Meine Oma lebt allein.|Bà tôi sống một mình.
|zusammen||cùng nhau|adv|Wir essen zusammen.|Chúng tôi ăn cùng nhau.
|groß||lớn, cao|adj|Mein Bruder ist sehr groß.|Anh trai tôi rất cao.
|klein||nhỏ, thấp|adj|Unsere Wohnung ist klein.|Căn hộ của chúng tôi nhỏ.

#L8 Đồ vật quanh ta
der|Tisch|die Tische|cái bàn|n|Das Buch liegt auf dem Tisch.|Quyển sách nằm trên bàn.
der|Stuhl|die Stühle|cái ghế|n|Der Stuhl ist bequem.|Cái ghế này ngồi thoải mái.
das|Buch|die Bücher|quyển sách|n|Das Buch ist interessant.|Quyển sách này hay.
der|Kugelschreiber|die Kugelschreiber|bút bi|n|Hast du einen Kugelschreiber?|Bạn có bút bi không?
der|Bleistift|die Bleistifte|bút chì|n|Der Bleistift ist kaputt.|Cây bút chì bị hỏng.
das|Heft|die Hefte|quyển vở|n|Ich brauche ein Heft.|Tôi cần một quyển vở.
die|Tasche|die Taschen|cái túi, cặp|n|Die Tasche ist schwer.|Cái túi nặng.
das|Handy|die Handys|điện thoại di động|n|Mein Handy ist neu.|Điện thoại của tôi mới.
der|Schlüssel|die Schlüssel|chìa khóa|n|Wo ist mein Schlüssel?|Chìa khóa của tôi đâu rồi?
die|Uhr|die Uhren|đồng hồ; giờ|n|Die Uhr ist teuer.|Cái đồng hồ đắt.
die|Brille|die Brillen|kính mắt|n|Ich trage eine Brille.|Tôi đeo kính.
der|Computer|die Computer|máy tính|n|Der Computer ist schon alt.|Cái máy tính đã cũ rồi.
die|Lampe|die Lampen|cái đèn|n|Die Lampe ist sehr hell.|Cái đèn rất sáng.
das|Foto|die Fotos|bức ảnh|n|Das Foto ist schön.|Bức ảnh đẹp.
die|Zeitung|die Zeitungen|tờ báo|n|Mein Vater liest die Zeitung.|Bố tôi đọc báo.
das|Wörterbuch|die Wörterbücher|từ điển|n|Das Wörterbuch ist dick.|Quyển từ điển dày.
das|Papier|die Papiere|giấy|n|Ich brauche Papier.|Tôi cần giấy.
|was||cái gì|q|Was ist das?|Đây là cái gì?
|das||đây, đó (chỉ vật)|pron|Das ist ein Wörterbuch.|Đây là một quyển từ điển.
|ein||một (mạo từ không xác định)|art|Das ist ein Tisch.|Đây là một cái bàn.
|kein||không (phủ định danh từ)|art|Das ist kein Stuhl.|Đây không phải là cái ghế.
|neu||mới|adj|Das Auto ist neu.|Chiếc ô tô còn mới.
|kaputt||hỏng|adj|Die Uhr ist kaputt.|Đồng hồ bị hỏng.
|schön||đẹp|adj|Die Lampe ist schön.|Cây đèn đẹp.
|brauchen|braucht; hat gebraucht|cần|v|Ich brauche einen Stift.|Tôi cần một cây bút.
|suchen|sucht; hat gesucht|tìm|v|Ich suche meine Brille.|Tôi đang tìm kính của mình.

#L9 Đồ ăn và thức uống
das|Brot|die Brote|bánh mì|n|Ich esse Brot mit Käse.|Tôi ăn bánh mì với phô mai.
das|Brötchen|die Brötchen|bánh mì nhỏ|n|Zum Frühstück esse ich zwei Brötchen.|Bữa sáng tôi ăn hai ổ bánh mì nhỏ.
der|Käse|-|phô mai|n|Der Käse ist aus der Schweiz.|Phô mai này từ Thụy Sĩ.
die|Butter|-|bơ|n|Ich brauche Butter.|Tôi cần bơ.
das|Ei|die Eier|quả trứng|n|Ich koche zwei Eier.|Tôi luộc hai quả trứng.
das|Fleisch|-|thịt|n|Er isst kein Fleisch.|Anh ấy không ăn thịt.
der|Fisch|die Fische|cá|n|Der Fisch ist frisch.|Cá còn tươi.
der|Reis|-|gạo, cơm|n|In Vietnam essen wir viel Reis.|Ở Việt Nam chúng tôi ăn nhiều cơm.
das|Gemüse|-|rau củ|n|Gemüse ist gesund.|Rau củ tốt cho sức khỏe.
das|Obst|-|trái cây|n|Ich kaufe Obst auf dem Markt.|Tôi mua trái cây ở chợ.
der|Apfel|die Äpfel|quả táo|n|Der Apfel ist rot.|Quả táo màu đỏ.
die|Banane|die Bananen|quả chuối|n|Die Bananen sind gelb.|Những quả chuối màu vàng.
das|Wasser|-|nước|n|Ich trinke viel Wasser.|Tôi uống nhiều nước.
der|Kaffee|-|cà phê|n|Möchtest du einen Kaffee?|Bạn có muốn một ly cà phê không?
der|Tee|die Tees|trà|n|Ich trinke lieber Tee.|Tôi thích uống trà hơn.
die|Milch|-|sữa|n|Die Milch ist kalt.|Sữa lạnh.
der|Saft|die Säfte|nước ép|n|Einen Orangensaft, bitte.|Cho tôi một ly nước cam.
das|Bier|die Biere|bia|n|Ein Bier, bitte.|Cho tôi một cốc bia.
|essen|isst; hat gegessen|ăn|v|Was isst du gern?|Bạn thích ăn gì?
|trinken|trinkt; hat getrunken|uống|v|Wir trinken Kaffee.|Chúng tôi uống cà phê.
|möchten|möchte; -|muốn (lịch sự)|v|Ich möchte ein Wasser.|Tôi muốn một chai nước.
|nehmen|nimmt; hat genommen|lấy, chọn|v|Ich nehme den Fisch.|Tôi chọn món cá.
|gern||thích (làm gì), sẵn lòng|adv|Ich esse gern Obst.|Tôi thích ăn trái cây.
|lecker||ngon|adj|Das Essen ist lecker!|Đồ ăn ngon quá!
|Hunger haben||đói|exp|Ich habe Hunger.|Tôi đói.
|Durst haben||khát|exp|Hast du Durst?|Bạn có khát không?

#L10 Mua sắm và giá tiền
|kaufen|kauft; hat gekauft|mua|v|Ich kaufe ein Kilo Äpfel.|Tôi mua một ký táo.
|kosten|kostet; hat gekostet|có giá, trị giá|v|Was kostet das Brot?|Ổ bánh mì này giá bao nhiêu?
|bezahlen|bezahlt; hat bezahlt|trả tiền|v|Kann ich mit Karte bezahlen?|Tôi trả bằng thẻ được không?
|einkaufen|kauft ein; hat eingekauft|đi mua sắm|v|Am Samstag kaufen wir ein.|Thứ Bảy chúng tôi đi mua sắm.
der|Supermarkt|die Supermärkte|siêu thị|n|Der Supermarkt ist bis 20 Uhr offen.|Siêu thị mở cửa đến 20 giờ.
der|Markt|die Märkte|chợ|n|Der Markt ist am Mittwoch.|Chợ họp vào thứ Tư.
das|Geschäft|die Geschäfte|cửa hàng|n|Das Geschäft ist heute geschlossen.|Cửa hàng hôm nay đóng cửa.
der|Euro|die Euro|đồng euro|n|Das kostet zwei Euro.|Cái này giá hai euro.
der|Cent|die Cent|xu (1/100 euro)|n|Das kostet 50 Cent.|Cái này giá 50 xu.
das|Geld|-|tiền|n|Ich habe kein Geld.|Tôi không có tiền.
die|Kasse|die Kassen|quầy thu ngân|n|Bitte bezahlen Sie an der Kasse.|Xin vui lòng trả tiền ở quầy thu ngân.
die|Karte|die Karten|thẻ; vé; bản đồ|n|Nehmen Sie Karte?|Ở đây có nhận thẻ không?
das|Kilo|die Kilo|ký, kilôgam|n|Ein Kilo Tomaten, bitte.|Cho tôi một ký cà chua.
die|Flasche|die Flaschen|cái chai|n|Ich kaufe eine Flasche Wasser.|Tôi mua một chai nước.
die|Packung|die Packungen|gói, hộp|n|Eine Packung Reis kostet zwei Euro.|Một gói gạo giá hai euro.
das|Angebot|die Angebote|hàng khuyến mãi; lời mời|n|Die Äpfel sind heute im Angebot.|Táo hôm nay đang khuyến mãi.
|teuer||đắt|adj|Das Handy ist zu teuer.|Cái điện thoại này đắt quá.
|billig||rẻ|adj|Das Obst ist hier billig.|Trái cây ở đây rẻ.
|günstig||giá hời, phải chăng|adj|Das Angebot ist günstig.|Hàng khuyến mãi này giá hời.
|offen||mở cửa|adj|Ist die Bäckerei noch offen?|Tiệm bánh còn mở cửa không?
|geschlossen||đóng cửa|adj|Am Sonntag ist alles geschlossen.|Chủ Nhật mọi thứ đều đóng cửa.
|viel||nhiều|adv|Das kostet viel Geld.|Cái đó tốn nhiều tiền.
|wenig||ít|adv|Ich habe wenig Zeit.|Tôi có ít thời gian.
|noch||còn, nữa|adv|Noch etwas?|Còn gì nữa không ạ?
|etwas||một chút, cái gì đó|pron|Ich möchte etwas trinken.|Tôi muốn uống chút gì đó.
|alles||tất cả|pron|Das ist alles, danke.|Thế là đủ rồi, cảm ơn.

#L11 Giờ giấc
die|Zeit|die Zeiten|thời gian|n|Hast du morgen Zeit?|Ngày mai bạn có rảnh không?
die|Stunde|die Stunden|giờ (khoảng 60 phút); tiết học|n|Der Film dauert zwei Stunden.|Bộ phim dài hai tiếng.
die|Minute|die Minuten|phút|n|Warte bitte fünf Minuten.|Làm ơn đợi năm phút.
die|Sekunde|die Sekunden|giây|n|Eine Sekunde, bitte!|Đợi một giây nhé!
die|Viertel|-|một phần tư (15 phút)|n|Es ist Viertel nach drei.|Bây giờ là ba giờ mười lăm.
|halb||rưỡi; một nửa|adj|Es ist halb acht.|Bây giờ là bảy giờ rưỡi.
|nach||sau (giờ); đến (nơi)|prep|Es ist zehn nach vier.|Bây giờ là bốn giờ mười.
|vor||trước (giờ); phía trước|prep|Es ist fünf vor zwölf.|Bây giờ là mười hai giờ kém năm.
|um||lúc (giờ)|prep|Der Zug kommt um neun Uhr.|Tàu đến lúc chín giờ.
der|Morgen|die Morgen|buổi sáng|n|Am Morgen trinke ich Kaffee.|Buổi sáng tôi uống cà phê.
der|Vormittag|die Vormittage|buổi sáng (trước trưa)|n|Am Vormittag arbeite ich.|Buổi sáng tôi làm việc.
der|Mittag|die Mittage|buổi trưa|n|Zu Mittag esse ich in der Kantine.|Buổi trưa tôi ăn ở căng tin.
der|Nachmittag|die Nachmittage|buổi chiều|n|Am Nachmittag gehe ich spazieren.|Buổi chiều tôi đi dạo.
der|Abend|die Abende|buổi tối|n|Am Abend sehe ich fern.|Buổi tối tôi xem tivi.
die|Nacht|die Nächte|ban đêm|n|In der Nacht schlafe ich.|Ban đêm tôi ngủ.
|wann||khi nào|q|Wann beginnt der Kurs?|Khi nào khóa học bắt đầu?
|spät||muộn|adj|Wie spät ist es?|Mấy giờ rồi?
|früh||sớm|adj|Ich stehe früh auf.|Tôi dậy sớm.
|jetzt||bây giờ|adv|Ich habe jetzt keine Zeit.|Bây giờ tôi không có thời gian.
|heute||hôm nay|adv|Heute ist Montag.|Hôm nay là thứ Hai.
|morgen||ngày mai|adv|Bis morgen!|Hẹn mai gặp lại!
|gestern||hôm qua|adv|Gestern war ich zu Hause.|Hôm qua tôi ở nhà.
|beginnen|beginnt; hat begonnen|bắt đầu|v|Der Unterricht beginnt um acht.|Giờ học bắt đầu lúc tám giờ.
|dauern|dauert; hat gedauert|kéo dài|v|Wie lange dauert der Kurs?|Khóa học kéo dài bao lâu?
|warten|wartet; hat gewartet|chờ, đợi|v|Ich warte auf den Bus.|Tôi đang đợi xe buýt.
|pünktlich||đúng giờ|adj|Der Zug ist pünktlich.|Tàu đến đúng giờ.

#L12 Một ngày của tôi
der|Tag|die Tage|ngày|n|Wie war dein Tag?|Ngày hôm nay của bạn thế nào?
der|Montag|die Montage|thứ Hai|n|Am Montag habe ich Deutschkurs.|Thứ Hai tôi có lớp tiếng Đức.
der|Dienstag|die Dienstage|thứ Ba|n|Am Dienstag gehe ich schwimmen.|Thứ Ba tôi đi bơi.
der|Mittwoch|die Mittwoche|thứ Tư|n|Am Mittwoch arbeite ich lange.|Thứ Tư tôi làm việc đến muộn.
der|Donnerstag|die Donnerstage|thứ Năm|n|Der Termin ist am Donnerstag.|Cuộc hẹn vào thứ Năm.
der|Freitag|die Freitage|thứ Sáu|n|Am Freitag gehen wir ins Kino.|Thứ Sáu chúng tôi đi xem phim.
der|Samstag|die Samstage|thứ Bảy|n|Am Samstag kaufe ich ein.|Thứ Bảy tôi đi mua sắm.
der|Sonntag|die Sonntage|Chủ Nhật|n|Am Sonntag schlafe ich lange.|Chủ Nhật tôi ngủ dậy muộn.
die|Woche|die Wochen|tuần|n|Ich arbeite fünf Tage pro Woche.|Tôi làm việc năm ngày một tuần.
das|Wochenende|die Wochenenden|cuối tuần|n|Schönes Wochenende!|Chúc cuối tuần vui vẻ!
das|Frühstück|die Frühstücke|bữa sáng|n|Das Frühstück ist fertig.|Bữa sáng đã sẵn sàng.
|aufstehen|steht auf; ist aufgestanden|thức dậy, đứng dậy|v|Ich stehe um sechs Uhr auf.|Tôi dậy lúc sáu giờ.
|frühstücken|frühstückt; hat gefrühstückt|ăn sáng|v|Wir frühstücken zusammen.|Chúng tôi ăn sáng cùng nhau.
|arbeiten|arbeitet; hat gearbeitet|làm việc|v|Mein Vater arbeitet viel.|Bố tôi làm việc nhiều.
|kochen|kocht; hat gekocht|nấu ăn|v|Am Abend koche ich Reis.|Buổi tối tôi nấu cơm.
|schlafen|schläft; hat geschlafen|ngủ|v|Das Baby schläft.|Em bé đang ngủ.
|fernsehen|sieht fern; hat ferngesehen|xem tivi|v|Am Abend sehe ich fern.|Buổi tối tôi xem tivi.
|duschen|duscht; hat geduscht|tắm vòi sen|v|Ich dusche am Morgen.|Tôi tắm vào buổi sáng.
|anfangen|fängt an; hat angefangen|bắt đầu|v|Der Film fängt um acht an.|Bộ phim bắt đầu lúc tám giờ.
|aufräumen|räumt auf; hat aufgeräumt|dọn dẹp|v|Am Samstag räume ich auf.|Thứ Bảy tôi dọn dẹp nhà.
|immer||luôn luôn|adv|Er ist immer pünktlich.|Anh ấy luôn đúng giờ.
|oft||thường, hay|adv|Ich koche oft.|Tôi hay nấu ăn.
|manchmal||thỉnh thoảng|adv|Manchmal gehe ich joggen.|Thỉnh thoảng tôi chạy bộ.
|nie||không bao giờ|adv|Ich trinke nie Bier.|Tôi không bao giờ uống bia.
|dann||sau đó, rồi|adv|Zuerst dusche ich, dann frühstücke ich.|Đầu tiên tôi tắm, sau đó ăn sáng.
|zuerst||trước tiên|adv|Zuerst trinke ich Kaffee.|Trước tiên tôi uống cà phê.

#L13 Sở thích và thời gian rảnh
das|Hobby|die Hobbys|sở thích|n|Was ist dein Hobby?|Sở thích của bạn là gì?
die|Freizeit|-|thời gian rảnh|n|In der Freizeit lese ich.|Lúc rảnh tôi đọc sách.
die|Musik|-|âm nhạc|n|Ich höre gern Musik.|Tôi thích nghe nhạc.
der|Film|die Filme|bộ phim|n|Der Film ist spannend.|Bộ phim rất hấp dẫn.
das|Kino|die Kinos|rạp chiếu phim|n|Gehen wir ins Kino?|Chúng mình đi xem phim nhé?
der|Sport|-|thể thao|n|Machst du gern Sport?|Bạn có thích chơi thể thao không?
der|Fußball|die Fußbälle|bóng đá; quả bóng|n|Er spielt jeden Samstag Fußball.|Thứ Bảy nào anh ấy cũng đá bóng.
das|Spiel|die Spiele|trò chơi; trận đấu|n|Das Spiel beginnt um drei.|Trận đấu bắt đầu lúc ba giờ.
die|Gitarre|die Gitarren|đàn ghi-ta|n|Meine Schwester spielt Gitarre.|Em gái tôi chơi ghi-ta.
|spielen|spielt; hat gespielt|chơi|v|Die Kinder spielen im Park.|Bọn trẻ chơi trong công viên.
|lesen|liest; hat gelesen|đọc|v|Sie liest ein Buch.|Cô ấy đang đọc sách.
|sehen|sieht; hat gesehen|nhìn, xem|v|Siehst du das Haus?|Bạn có thấy ngôi nhà không?
|hören|hört; hat gehört|nghe|v|Wir hören Radio.|Chúng tôi nghe đài.
|schwimmen|schwimmt; ist geschwommen|bơi|v|Im Sommer schwimme ich viel.|Mùa hè tôi bơi nhiều.
|tanzen|tanzt; hat getanzt|nhảy, khiêu vũ|v|Tanzt du gern?|Bạn có thích nhảy không?
|singen|singt; hat gesungen|hát|v|Das Kind singt ein Lied.|Đứa bé hát một bài hát.
|fotografieren|fotografiert; hat fotografiert|chụp ảnh|v|Ich fotografiere gern Blumen.|Tôi thích chụp ảnh hoa.
|reisen|reist; ist gereist|đi du lịch|v|Wir reisen gern.|Chúng tôi thích đi du lịch.
|treffen|trifft; hat getroffen|gặp gỡ|v|Ich treffe heute meine Freunde.|Hôm nay tôi gặp bạn bè.
|machen|macht; hat gemacht|làm|v|Was machst du am Wochenende?|Cuối tuần bạn làm gì?
|spazieren gehen|geht spazieren; ist spazieren gegangen|đi dạo|v|Am Sonntag gehen wir spazieren.|Chủ Nhật chúng tôi đi dạo.
|lieber||thích hơn|adv|Ich trinke lieber Tee als Kaffee.|Tôi thích uống trà hơn cà phê.
|interessant||thú vị, hay|adj|Das Buch ist sehr interessant.|Quyển sách rất hay.
|langweilig||nhàm chán|adj|Der Film ist langweilig.|Bộ phim chán.
|toll||tuyệt vời|adj|Das Konzert war toll!|Buổi hòa nhạc thật tuyệt!
|zusammen spielen||chơi cùng nhau|exp|Wollen wir zusammen spielen?|Chúng mình chơi cùng nhau nhé?

#L14 Nhà ở
das|Haus|die Häuser|ngôi nhà|n|Das Haus hat einen Garten.|Ngôi nhà có một khu vườn.
die|Wohnung|die Wohnungen|căn hộ|n|Die Wohnung hat drei Zimmer.|Căn hộ có ba phòng.
das|Zimmer|die Zimmer|căn phòng|n|Mein Zimmer ist hell.|Phòng tôi sáng sủa.
die|Küche|die Küchen|nhà bếp|n|Die Küche ist modern.|Nhà bếp hiện đại.
das|Bad|die Bäder|phòng tắm|n|Das Bad ist klein.|Phòng tắm nhỏ.
das|Schlafzimmer|die Schlafzimmer|phòng ngủ|n|Das Schlafzimmer ist ruhig.|Phòng ngủ yên tĩnh.
das|Wohnzimmer|die Wohnzimmer|phòng khách|n|Wir sitzen im Wohnzimmer.|Chúng tôi ngồi ở phòng khách.
der|Balkon|die Balkone|ban công|n|Die Wohnung hat einen Balkon.|Căn hộ có ban công.
der|Garten|die Gärten|khu vườn|n|Im Garten spielen die Kinder.|Bọn trẻ chơi trong vườn.
das|Bett|die Betten|cái giường|n|Das Bett ist zu klein.|Cái giường nhỏ quá.
der|Schrank|die Schränke|cái tủ|n|Die Kleidung ist im Schrank.|Quần áo ở trong tủ.
das|Sofa|die Sofas|ghế sofa|n|Das Sofa ist bequem.|Ghế sofa ngồi thoải mái.
das|Fenster|die Fenster|cửa sổ|n|Mach bitte das Fenster auf.|Làm ơn mở cửa sổ ra.
die|Tür|die Türen|cửa ra vào|n|Die Tür ist zu.|Cửa đang đóng.
die|Miete|die Mieten|tiền thuê nhà|n|Die Miete ist hoch.|Tiền thuê nhà cao.
der|Stock|die Stockwerke|tầng|n|Ich wohne im dritten Stock.|Tôi sống ở tầng ba.
|es gibt||có (tồn tại)|exp|In der Küche gibt es einen Tisch.|Trong bếp có một cái bàn.
|mieten|mietet; hat gemietet|thuê|v|Wir mieten eine Wohnung.|Chúng tôi thuê một căn hộ.
|liegen|liegt; hat gelegen|nằm|v|Das Handy liegt auf dem Sofa.|Điện thoại nằm trên ghế sofa.
|stehen|steht; hat gestanden|đứng; đặt (đứng)|v|Der Schrank steht im Flur.|Cái tủ đặt ở hành lang.
|hell||sáng|adj|Das Zimmer ist schön hell.|Căn phòng sáng sủa dễ chịu.
|dunkel||tối|adj|Der Flur ist dunkel.|Hành lang tối.
|ruhig||yên tĩnh|adj|Die Straße ist ruhig.|Con phố yên tĩnh.
|laut||ồn ào; to|adj|Die Nachbarn sind laut.|Hàng xóm ồn ào.
|modern||hiện đại|adj|Die Möbel sind modern.|Đồ đạc hiện đại.
|bequem||thoải mái, tiện|adj|Das Bett ist bequem.|Cái giường nằm thoải mái.

#L15 Thành phố và chỉ đường
die|Straße|die Straßen|con đường, phố|n|Ich wohne in der Goethestraße.|Tôi sống ở phố Goethe.
der|Platz|die Plätze|quảng trường; chỗ|n|Der Platz ist sehr schön.|Quảng trường rất đẹp.
der|Bahnhof|die Bahnhöfe|nhà ga|n|Wo ist der Bahnhof?|Nhà ga ở đâu?
die|Post|-|bưu điện|n|Die Post ist neben der Bank.|Bưu điện nằm cạnh ngân hàng.
die|Bank|die Banken|ngân hàng|n|Die Bank öffnet um neun.|Ngân hàng mở cửa lúc chín giờ.
die|Apotheke|die Apotheken|hiệu thuốc|n|Gibt es hier eine Apotheke?|Ở đây có hiệu thuốc không?
das|Krankenhaus|die Krankenhäuser|bệnh viện|n|Das Krankenhaus ist groß.|Bệnh viện rất lớn.
die|Kirche|die Kirchen|nhà thờ|n|Die Kirche ist sehr alt.|Nhà thờ rất cổ.
das|Museum|die Museen|bảo tàng|n|Das Museum ist am Montag geschlossen.|Bảo tàng đóng cửa vào thứ Hai.
der|Park|die Parks|công viên|n|Wir gehen in den Park.|Chúng tôi đi công viên.
das|Hotel|die Hotels|khách sạn|n|Das Hotel ist im Zentrum.|Khách sạn ở trung tâm.
das|Zentrum|die Zentren|trung tâm|n|Ich wohne im Zentrum.|Tôi sống ở trung tâm.
die|Ampel|die Ampeln|đèn giao thông|n|Gehen Sie bis zur Ampel.|Ông/bà đi đến chỗ đèn giao thông.
die|Ecke|die Ecken|góc (phố)|n|Das Café ist an der Ecke.|Quán cà phê ở góc phố.
|links||bên trái|adv|Gehen Sie hier links.|Ông/bà rẽ trái ở đây.
|rechts||bên phải|adv|Die Post ist rechts.|Bưu điện ở bên phải.
|geradeaus||đi thẳng|adv|Gehen Sie immer geradeaus.|Ông/bà cứ đi thẳng.
|weit||xa|adj|Ist es weit?|Có xa không?
|nah||gần|adj|Der Bahnhof ist ganz nah.|Nhà ga ở rất gần.
|hier||ở đây|adv|Hier ist der Park.|Công viên ở đây.
|dort||ở đó|adv|Dort ist die Apotheke.|Hiệu thuốc ở đằng kia.
|neben||bên cạnh|prep|Die Bank ist neben dem Hotel.|Ngân hàng ở bên cạnh khách sạn.
|gegenüber||đối diện|prep|Das Kino ist gegenüber.|Rạp phim ở phía đối diện.
|gehen|geht; ist gegangen|đi (bộ)|v|Ich gehe zum Bahnhof.|Tôi đi đến nhà ga.
|finden|findet; hat gefunden|tìm thấy; thấy (cho là)|v|Ich finde die Post nicht.|Tôi không tìm thấy bưu điện.
|zeigen|zeigt; hat gezeigt|chỉ, cho xem|v|Können Sie mir den Weg zeigen?|Ông/bà có thể chỉ đường cho tôi không?
der|Weg|die Wege|con đường; lối đi|n|Ich kenne den Weg nicht.|Tôi không biết đường.

#L16 Phương tiện đi lại
das|Auto|die Autos|ô tô|n|Wir fahren mit dem Auto.|Chúng tôi đi bằng ô tô.
der|Bus|die Busse|xe buýt|n|Der Bus kommt gleich.|Xe buýt sắp tới.
der|Zug|die Züge|tàu hỏa|n|Der Zug fährt nach Berlin.|Tàu chạy đi Berlin.
die|U-Bahn|die U-Bahnen|tàu điện ngầm|n|Ich fahre mit der U-Bahn zur Arbeit.|Tôi đi làm bằng tàu điện ngầm.
die|Straßenbahn|die Straßenbahnen|tàu điện mặt đất|n|Die Straßenbahn ist voll.|Tàu điện chật kín người.
das|Fahrrad|die Fahrräder|xe đạp|n|Ich fahre gern Fahrrad.|Tôi thích đi xe đạp.
das|Flugzeug|die Flugzeuge|máy bay|n|Das Flugzeug landet um zehn.|Máy bay hạ cánh lúc mười giờ.
das|Taxi|die Taxis|xe taxi|n|Wir nehmen ein Taxi.|Chúng ta đi taxi nhé.
die|Haltestelle|die Haltestellen|trạm dừng xe|n|Die Haltestelle ist dort drüben.|Trạm xe buýt ở đằng kia.
die|Fahrkarte|die Fahrkarten|vé xe, vé tàu|n|Ich kaufe eine Fahrkarte.|Tôi mua một vé tàu.
das|Ticket|die Tickets|vé|n|Hast du ein Ticket?|Bạn có vé không?
der|Flughafen|die Flughäfen|sân bay|n|Der Flughafen ist weit weg.|Sân bay ở xa.
das|Gleis|die Gleise|đường ray, sân ga|n|Der Zug fährt von Gleis drei ab.|Tàu khởi hành từ đường ray số ba.
die|Abfahrt|die Abfahrten|giờ khởi hành|n|Die Abfahrt ist um 8:15 Uhr.|Giờ khởi hành là 8 giờ 15.
die|Ankunft|die Ankünfte|giờ đến|n|Die Ankunft in Köln ist um elf.|Giờ đến Köln là mười một giờ.
|fahren|fährt; ist gefahren|đi (bằng xe), lái xe|v|Ich fahre mit dem Bus.|Tôi đi bằng xe buýt.
|fliegen|fliegt; ist geflogen|bay|v|Wir fliegen nach Vietnam.|Chúng tôi bay về Việt Nam.
|abfahren|fährt ab; ist abgefahren|khởi hành|v|Der Bus fährt um sieben ab.|Xe buýt khởi hành lúc bảy giờ.
|ankommen|kommt an; ist angekommen|đến nơi|v|Wann kommt der Zug an?|Khi nào tàu đến?
|einsteigen|steigt ein; ist eingestiegen|lên xe|v|Bitte schnell einsteigen!|Xin mời lên xe nhanh!
|aussteigen|steigt aus; ist ausgestiegen|xuống xe|v|Wir steigen hier aus.|Chúng ta xuống ở đây.
|umsteigen|steigt um; ist umgestiegen|đổi tàu, đổi xe|v|In Frankfurt steige ich um.|Tôi đổi tàu ở Frankfurt.
|mit||với, bằng (phương tiện)|prep|Ich fahre mit dem Zug.|Tôi đi bằng tàu hỏa.
|zu||đến, tới (người, nơi)|prep|Ich gehe zu Fuß.|Tôi đi bộ.
|schnell||nhanh|adj|Der Zug ist sehr schnell.|Tàu chạy rất nhanh.
|langsam||chậm|adj|Bitte sprechen Sie langsam.|Xin ông/bà nói chậm thôi.
|direkt||trực tiếp, thẳng|adj|Der Bus fährt direkt zum Flughafen.|Xe buýt chạy thẳng ra sân bay.
`]);
