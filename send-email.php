<?php
// Prevent direct access
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: contact.html");
    exit;
}

// Your email address (the one you created in Hostinger)
$to_email = "info@moheb.cloud";

// Get form data and sanitize
$name = strip_tags(trim($_POST["name"]));
$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
$phone = strip_tags(trim($_POST["phone"]));
$organization = strip_tags(trim($_POST["organization"]));
$interest = strip_tags(trim($_POST["interest"]));
$message = strip_tags(trim($_POST["message"]));

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
$subject = "New Contact Form Submission from $name";

// Create email body
$email_body = "You have received a new message from the contact form on your website.\n\n";
$email_body .= "Name: $name\n";
$email_body .= "Email: $email\n";
$email_body .= "Phone: $phone\n";
$email_body .= "Organization: $organization\n";
$email_body .= "Interest: $interest\n\n";
$email_body .= "Message:\n$message\n";

// Email headers
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to_email, $subject, $email_body, $headers)) {
    header("Location: contact.html?success=1");
} else {
    header("Location: contact.html?error=send_failed");
}

exit;
?>
