<?php
$name = $phone = $email = $charterDate = $message = $boat = $pageUrl = "";
$transactionalConsent = false;
$success = $error = "";

function post_value($key) {
    return trim((string) ($_POST[$key] ?? ""));
}

function escape($value) {
    return htmlspecialchars($value, ENT_QUOTES, "UTF-8");
}

function normalize_return_path($value) {
    $value = trim((string) $value);

    if ($value === "") {
        return "";
    }

    $value = str_replace(["\r", "\n"], "", $value);

    $parts = parse_url($value);
    if ($parts === false || isset($parts["scheme"]) || isset($parts["host"]) || isset($parts["user"]) || isset($parts["pass"])) {
        return "";
    }

    $path = $parts["path"] ?? "";
    if ($path === "" || substr($path, 0, 1) === "/" || strpos($path, "..") !== false) {
        return "";
    }

    if (!preg_match("/^[A-Za-z0-9._\/-]+$/", $path)) {
        return "";
    }

    return $path;
}

function redirect_to_page($pageUrl, $status, $message) {
    $path = normalize_return_path($pageUrl);

    if ($path === "") {
        return false;
    }

    $query = http_build_query([
        "contact_status" => $status,
        "contact_message" => $message,
    ]);

    header("Location: {$path}?{$query}#contact-form");
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = post_value("name");
    $phone = post_value("phone");
    $email = post_value("email");
    $charterDate = post_value("charter_date");
    $message = post_value("message");
    $boat = post_value("boat");
    $pageUrl = post_value("page_url");
    $transactionalConsent = isset($_POST["transactional_consent"]);

    $phoneDigits = preg_replace("/\D+/", "", $phone);

    if (!$name || !$phone || !$email || !$charterDate || !$message) {
        $error = "Please fill in all fields.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Enter a valid email address.";
    } elseif (strlen($phoneDigits) < 10) {
        $error = "Enter a valid phone number.";
    } else {
        $to = "demo@driev.com";
        $safeBoat = preg_replace("/[\r\n]+/", " ", $boat);
        $subject = $safeBoat ? "Inquiry $safeBoat" : "Inquiry";
        $replyTo = str_replace(["\r", "\n"], "", $email);

        $body = "You received a new boat inquiry:\n\n"
              . "Boat: " . ($boat ?: "Not provided") . "\n"
              . "Name: $name\n"
              . "Phone: $phone\n"
              . "Charter Date: $charterDate\n"
              . "Email: $email\n"
              . "SMS Consent: " . ($transactionalConsent ? "Yes" : "No") . "\n\n"
              . "Message:\n$message";

        $headers = "From: Individual Yacht Page <no-reply@flamingoyachtcharters.com>\r\n";
        $headers .= "Reply-To: $replyTo\r\n";

        if (mail($to, $subject, $body, $headers)) {
            $success = "Message sent successfully.";
            $name = $phone = $email = $charterDate = $message = "";
            $transactionalConsent = false;
            redirect_to_page($pageUrl, "success", $success);
        } else {
            $error = "Message failed to send. Try again later.";
            redirect_to_page($pageUrl, "error", $error);
        }
    }

    if ($error) {
        redirect_to_page($pageUrl, "error", $error);
    }
}

$pageTitle = $boat ? "Contact About " . $boat : "Contact Us";
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title><?php echo escape($pageTitle); ?></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
        min-height: 100vh;
        padding: 24px 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .card {
        background: white;
        padding: 30px;
        border-radius: 14px;
        width: 100%;
        max-width: 420px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        animation: fadeIn 0.6s ease;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    h2 {
        margin-top: 0;
        text-align: center;
    }

    .lead {
        margin: 0 0 18px;
        color: #4a5560;
        text-align: center;
        font-size: 14px;
    }

    input[type="text"], input[type="tel"], input[type="email"], textarea {
        width: 100%;
        padding: 12px;
        margin-top: 12px;
        border-radius: 8px;
        border: 1px solid #ddd;
        font-size: 14px;
        transition: 0.2s;
    }

    input[type="text"]:focus, input[type="tel"]:focus, input[type="email"]:focus, textarea:focus {
        border-color: #2c5364;
        outline: none;
        box-shadow: 0 0 0 2px rgba(44,83,100,0.1);
    }

    textarea {
        resize: vertical;
        min-height: 120px;
    }

    .opt-in {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        margin-top: 12px;
        color: #4a5560;
        font-size: 12px;
        line-height: 1.4;
    }

    .opt-in input[type="checkbox"] {
        flex: 0 0 auto;
        margin: 3px 0 0;
    }

    .opt-in a {
        color: #2c5364;
    }

    button {
        width: 100%;
        margin-top: 15px;
        padding: 12px;
        border: none;
        border-radius: 8px;
        background: #2c5364;
        color: white;
        font-size: 15px;
        cursor: pointer;
        transition: 0.2s;
    }

    button:hover {
        background: #203a43;
    }

    .msg {
        margin: 0 0 14px;
        text-align: center;
        font-size: 14px;
    }

    .success {
        color: #2e7d32;
    }

    .error {
        color: #c62828;
    }

    .back-link {
        display: inline-flex;
        margin-top: 16px;
        color: #2c5364;
        text-decoration: none;
        font-size: 14px;
    }
</style>
</head>
<body>

<div class="card">
    <h2><?php echo escape($pageTitle); ?></h2>
    <p class="lead">Send your details and your message. Contact details are required.</p>

    <?php if ($success): ?>
        <div class="msg success"><?php echo escape($success); ?></div>
    <?php elseif ($error): ?>
        <div class="msg error"><?php echo escape($error); ?></div>
    <?php endif; ?>

    <form method="POST">
        <input type="hidden" name="boat" value="<?php echo escape($boat); ?>">
        <input type="hidden" name="page_url" value="<?php echo escape($pageUrl); ?>">
        <input type="text" name="name" placeholder="Your Name" value="<?php echo escape($name); ?>" required>
        <input type="tel" name="phone" placeholder="Your Phone Number" value="<?php echo escape($phone); ?>" required>
        <input type="email" name="email" placeholder="Your Email" value="<?php echo escape($email); ?>" required>
        <input type="text" name="charter_date" placeholder="Preferred Charter Date" value="<?php echo escape($charterDate); ?>" required>
        <textarea name="message" placeholder="Your Message" required><?php echo escape($message); ?></textarea>
        <label class="opt-in">
            <input type="checkbox" name="transactional_consent" value="1" <?php echo $transactionalConsent ? "checked" : ""; ?>>
            <span>I consent to receive SMS messages from Flamingo Yacht Charters related to my booking, account updates, and promotional offers. Message frequency may vary. Message and data rates may apply. Reply STOP to opt out or HELP for help. See our <a href="/privacy-policy/">Privacy Policy</a> and <a href="/sms-terms/">SMS Terms &amp; Conditions</a>.</span>
        </label>
        <button type="submit">Send Message</button>
    </form>

    <?php if ($pageUrl): ?>
        <a class="back-link" href="<?php echo escape($pageUrl); ?>#contact-form">Back to boat page</a>
    <?php endif; ?>
</div>

</body>
</html>
