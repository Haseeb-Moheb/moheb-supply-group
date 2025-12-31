<?php
// Enable error logging for debugging
error_log("=== Contact Form Submission Started ===");
error_log("Time: " . date('Y-m-d H:i:s'));

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

error_log("Form Data - Name: $name, Email: $email, Interest: $interest");

// Validate required fields
if (empty($name) || empty($email) || empty($interest) || empty($message)) {
    error_log("ERROR: Missing required fields");
    header("Location: contact.html?error=missing");
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    error_log("ERROR: Invalid email format: $email");
    header("Location: contact.html?error=invalid_email");
    exit;
}

// Create email subject
$subject = "New Contact Form Submission - " . $name;

// Create HTML email body for YOU
$email_body = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: white; }
        .header { 
            background: linear-gradient(135deg, #1e3a8a, #6366f1); 
            color: white; 
            padding: 25px; 
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content { background: #f9f9f9; padding: 25px; border-radius: 0 0 10px 10px; }
        .field { 
            margin-bottom: 20px; 
            padding: 15px;
            background: white;
            border-left: 4px solid #3b82f6;
            border-radius: 5px;
        }
        .label { font-weight: bold; color: #1e40af; font-size: 14px; }
        .value { margin-top: 8px; color: #374151; font-size: 15px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2 style='margin: 0;'>🔔 New Contact Form Submission</h2>
            <p style='margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;'>From your website contact form</p>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>👤 Name:</div>
                <div class='value'>" . htmlspecialchars($name) . "</div>
            </div>
            <div class='field'>
                <div class='label'>📧 Email:</div>
                <div class='value'><a href='mailto:" . htmlspecialchars($email) . "' style='color: #3b82f6;'>" . htmlspecialchars($email) . "</a></div>
            </div>
            <div class='field'>
                <div class='label'>📞 Phone:</div>
                <div class='value'>" . (empty($phone) ? 'Not provided' : htmlspecialchars($phone)) . "</div>
            </div>
            <div class='field'>
                <div class='label'>🏢 Organization:</div>
                <div class='value'>" . (empty($organization) ? 'Not provided' : htmlspecialchars($organization)) . "</div>
            </div>
            <div class='field'>
                <div class='label'>🎯 Interested In:</div>
                <div class='value'>" . htmlspecialchars($interest) . "</div>
            </div>
            <div class='field'>
                <div class='label'>💬 Message:</div>
                <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
            </div>
            <div style='margin-top: 25px; padding: 15px; background: #dbeafe; border-radius: 5px; text-align: center;'>
                <p style='margin: 0; color: #1e40af;'><strong>Quick Actions:</strong></p>
                <p style='margin: 10px 0 0 0;'>
                    <a href='mailto:" . htmlspecialchars($email) . "' style='display: inline-block; background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 5px;'>Reply to Customer</a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>
";

// IMPORTANT: Use your domain email as "From"
$from_email = "noreply@moheb.cloud";

// Email headers for YOUR notification
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: Moheb Supply Group <noreply@moheb.cloud>\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Return-Path: noreply@moheb.cloud\r\n";
$headers .= "X-Mailer: Moheb Contact System\r\n";
$headers .= "X-Priority: 1\r\n";
$headers .= "Importance: High\r\n";
$headers .= "Message-ID: <" . time() . "-" . md5($email) . "@moheb.cloud>\r\n";

// Send notification email to YOU
error_log("Attempting to send notification email to: $to_email");
$mail_sent = mail($to_email, $subject, $email_body, $headers);

if ($mail_sent) {
    error_log("SUCCESS: Notification email sent to $to_email");
} else {
    error_log("ERROR: Failed to send notification email to $to_email");
}

// ===================================
// AUTO-REPLY TO CUSTOMER
// ===================================

$customer_subject = "Thank you for contacting Moheb Supply Group";

$customer_message = "
<html>
<head>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header { 
            background: linear-gradient(135deg, #1e3a8a 0%, #6366f1 100%); 
            color: white; 
            padding: 30px 20px; 
            text-align: center; 
        }
        .header h2 {
            margin: 0;
            font-size: 26px;
            font-weight: 600;
        }
        .content { 
            padding: 30px; 
            background: white;
        }
        .highlight { 
            background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%); 
            padding: 20px; 
            border-left: 4px solid #3b82f6; 
            border-radius: 8px;
            margin: 20px 0; 
        }
        .contact-info {
            margin: 25px 0;
            padding: 20px;
            background: #f9fafb;
            border-radius: 8px;
        }
        .contact-info ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .contact-info li {
            padding: 8px 0;
            color: #374151;
        }
        .footer { 
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            padding: 30px 20px; 
            text-align: center;
            color: #e5e7eb;
        }
        .footer-logo {
            margin-bottom: 15px;
        }
        .footer-logo img {
            width: 140px;
            height: 140px;
            border-radius: 12px;
            display: block;
            margin: 0 auto 15px auto;
        }
        .footer-text {
            font-size: 13px;
            line-height: 1.8;
            color: #d1d5db;
        }
        .footer-company {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
            color: white;
        }
        .footer-links {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #374151;
        }
        .footer-links a {
            color: #93c5fd;
            text-decoration: none;
            margin: 0 10px;
        }
        .divider {
            height: 2px;
            background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
            margin: 25px 0;
        }
    </style>
</head>
<body>
    <div class='email-container'>
        <!-- Header -->
        <div class='header'>
            <h2>✉️ Thank You for Contacting Us!</h2>
        </div>
        
        <!-- Content -->
        <div class='content'>
            <p style='font-size: 16px; color: #111827;'>Hi <strong>" . htmlspecialchars($name) . "</strong>,</p>
            
            <p style='font-size: 15px; color: #374151;'>
                Thank you for reaching out to <strong>Moheb Supply Group</strong>! We've received your message and one of our team members will respond within <strong>24 hours</strong>.
            </p>
            
            <div class='highlight'>
                <p style='margin: 0 0 10px 0; font-size: 15px; font-weight: 600; color: #1e40af;'>📋 Your Inquiry Details:</p>
                <p style='margin: 5px 0; color: #374151;'><strong>Name:</strong> " . htmlspecialchars($name) . "</p>
                <p style='margin: 5px 0; color: #374151;'><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
                <p style='margin: 5px 0; color: #374151;'><strong>Interest:</strong> " . htmlspecialchars($interest) . "</p>
            </div>
            
            <div class='divider'></div>
            
            <p style='font-size: 15px; color: #374151;'>
                In the meantime, feel free to explore our services or reach out directly:
            </p>
            
            <div class='contact-info'>
                <ul>
                    <li>📞 <strong>Phone:</strong> +1 (413) 285-3176</li>
                    <li>📧 <strong>Email:</strong> info@moheb.cloud</li>
                    <li>🌐 <strong>Website:</strong> <a href='https://moheb.cloud' style='color: #3b82f6; text-decoration: none;'>moheb.cloud</a></li>
                    <li>⏰ <strong>Hours:</strong> Mon-Fri 8AM-6PM CT | Sat 10AM-4PM CT</li>
                </ul>
            </div>
            
            <p style='font-size: 15px; color: #374151; margin-top: 25px;'>
                We look forward to working with you!
            </p>
            
            <p style='font-size: 15px; color: #111827; margin-top: 20px;'>
                Best regards,<br>
                <strong style='color: #1e40af;'>Moheb Supply Group Team</strong>
            </p>
        </div>
        
        <!-- Footer with Logo -->
        <div class='footer'>
            <div class='footer-logo'>
                <img src='https://moheb.cloud/logo.png' alt='Moheb Supply Group Logo'> 
            </div>
            
            <div class='footer-company'>
                MOHEB SUPPLY GROUP
            </div>
            
            <div class='footer-text'>
                Your trusted partner for government and business<br>
                supply solutions plus professional website development
            </div>
            
            <div class='footer-text' style='margin-top: 15px;'>
                NAICS: 424990 | San Diego, CA 92108
            </div>
            
            <div class='footer-links'>
                <a href='https://moheb.cloud'>Website</a> | 
                <a href='mailto:info@moheb.cloud'>Email</a> | 
                <a href='tel:+14132853176'>Call Us</a>
            </div>
            
            <div style='margin-top: 20px; padding-top: 15px; border-top: 1px solid #374151; font-size: 11px; color: #9ca3af;'>
                This is an automated message. Please do not reply to this email.<br>
                For assistance, contact us at info@moheb.cloud or call +1 (413) 285-3176
            </div>
        </div>
    </div>
</body>
</html>
";

$customer_headers = "MIME-Version: 1.0\r\n";
$customer_headers .= "Content-type: text/html; charset=UTF-8\r\n";
$customer_headers .= "From: Moheb Supply Group <info@moheb.cloud>\r\n";
$customer_headers .= "Reply-To: info@moheb.cloud\r\n";

// Send auto-reply to customer
error_log("Attempting to send auto-reply to customer: $email");
$customer_mail_sent = mail($email, $customer_subject, $customer_message, $customer_headers);

if ($customer_mail_sent) {
    error_log("SUCCESS: Auto-reply sent to customer: $email");
} else {
    error_log("ERROR: Failed to send auto-reply to customer: $email");
}

// ===================================
// END AUTO-REPLY
// ===================================

// Redirect based on whether MAIN email was sent
if ($mail_sent) {
    error_log("=== Form Submission Completed Successfully ===");
    header("Location: contact.html?success=1");
    exit;
} else {
    error_log("=== Form Submission Failed ===");
    header("Location: contact.html?error=send_failed");
    exit;
}
?>
