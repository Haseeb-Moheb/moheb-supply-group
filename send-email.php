<?php
// Prevent direct access
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: contact.html");
    exit;
}

$to_email = "info@moheb.cloud"; 

// Get form data and sanitize
$name = isset($_POST["name"]) ? strip_tags(trim($_POST["name"])) : '';
$email = isset($_POST["email"]) ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : '';
$phone = isset($_POST["phone"]) ? strip_tags(trim($_POST["phone"])) : '';
$organization = isset($_POST["organization"]) ? strip_tags(trim($_POST["organization"])) : '';
$interest = isset($_POST["interest"]) ? strip_tags(trim($_POST["interest"])) : '';
$message = isset($_POST["message"]) ? strip_tags(trim($_POST["message"])) : '';

// Validate required fields
if (empty($name) || empty($email) || empty($interest) || empty($message)) {
    header("Location: contact.html?error=missing");
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: contact.html?error=invalid_email");
    exit;
}

// Create email subject
$subject = "New Contact Form - " . $name;

// Create HTML email body
$email_body = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; margin-top: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #667eea; }
        .value { margin-top: 5px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Name:</div>
                <div class='value'>" . htmlspecialchars($name) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'>" . htmlspecialchars($email) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Phone:</div>
                <div class='value'>" . htmlspecialchars($phone) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Organization:</div>
                <div class='value'>" . htmlspecialchars($organization) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Interested In:</div>
                <div class='value'>" . htmlspecialchars($interest) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Message:</div>
                <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
            </div>
        </div>
    </div>
</body>
</html>
";

$from_email = "noreply@moheb.cloud";

// Email headers (Hostinger-compatible format)
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: Moheb Supply Group <" . $from_email . ">\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Send email
if (mail($to_email, $subject, $email_body, $headers)) {

$customer_subject = "Thank you for contacting Moheb Supply Group";
$customer_message = "
<html>
<body style='font-family: Arial, sans-serif;'>
    <h2>Thank you for reaching out!</h2>
    <p>Hi " . htmlspecialchars($name) . ",</p>
    <p>We've received your message and will respond within 24 hours.</p>
    <p>Your inquiry details:</p>
    <ul>
        <li><strong>Name:</strong> " . htmlspecialchars($name) . "</li>
        <li><strong>Interest:</strong> " . htmlspecialchars($interest) . "</li>
    </ul>
    <p>Best regards,<br>Moheb Supply Group Team</p>
    <p style='font-size: 12px; color: #666;'>
        Email: info@moheb.cloud<br>
        Phone: +1 (413) 285-3176<br>
        Website: https://moheb.cloud
    </p>
</body>
</html>
";

$customer_headers = "MIME-Version: 1.0\r\n";
$customer_headers .= "Content-type: text/html; charset=UTF-8\r\n";
$customer_headers .= "From: Moheb Supply Group <info@moheb.com>\r\n";

mail($email, $customer_subject, $customer_message, $customer_headers);

    // Success - redirect to contact page with success message
    header("Location: contact.html?success=1");
    exit;
} else {
    // Failed - redirect with error
    header("Location: contact.html?error=send_failed");
    exit;
}
?>

