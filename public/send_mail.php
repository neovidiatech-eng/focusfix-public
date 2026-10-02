<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // جلب البيانات من النموذج
    $name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
    $phone = isset($_POST['phone']) ? strip_tags(trim($_POST['phone'])) : '';
    $email = isset($_POST['email']) ? strip_tags(trim($_POST['email'])) : '';
    $device = isset($_POST['device']) ? strip_tags(trim($_POST['device'])) : '';
    $issue = isset($_POST['issue']) ? strip_tags(trim($_POST['issue'])) : '';
    $message_content = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';

    // التحقق من البيانات المطلوبة
    if (empty($name) || empty($phone) || empty($email)) {
        http_response_code(400);
        echo "الرجاء تعبئة الحقول المطلوبة (الاسم، الهاتف، والبريد الإلكتروني).";
        exit;
    }

    // إعداد البريد
    $to = "Info@focus-fastestrepair.com";
    $subject = "طلب صيانة جديد من الموقع - Focus Fix";
    // محتوى الرسالة
    $email_content = "طلب صيانة جديد تم إرساله من الموقع:\n\n";
    $email_content .= "الاسم: $name\n";
    $email_content .= "رقم الهاتف: $phone\n";
    $email_content .= "البريد الإلكتروني: $email\n";
    $email_content .= "نوع الجهاز: $device\n";
    $email_content .= "نوع العطل: $issue\n";
    $email_content .= "التفاصيل:\n$message_content\n";

    // ترويسة الرسالة
    $headers = "From: noreply@" . $_SERVER['HTTP_HOST'] . "\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

    // إرسال البريد
    if (mail($to, $subject, $email_content, $headers)) {
        http_response_code(200);
        echo "تم إرسال رسالتك بنجاح.";
    } else {
        http_response_code(500);
        echo "عذراً، حدث خطأ أثناء إرسال الرسالة.";
    }
} else {
    http_response_code(405);
    echo "Method Not Allowed";
}
?>
