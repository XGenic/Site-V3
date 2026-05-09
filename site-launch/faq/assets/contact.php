<?php
$success = "";
$error = "";

function clean_input($data) {
    return htmlspecialchars(trim((string) $data), ENT_QUOTES, "UTF-8");
}

function format_trip_date($value) {
    $date = DateTime::createFromFormat("Y-m-d", $value);
    return $date ? $date->format("m/d/Y") : $value;
}

function format_start_time($value) {
    $time = DateTime::createFromFormat("H:i", $value);
    return $time ? $time->format("g:i A") : $value;
}

function is_ajax_request() {
    return isset($_SERVER["HTTP_X_REQUESTED_WITH"]) && strtolower($_SERVER["HTTP_X_REQUESTED_WITH"]) === "xmlhttprequest";
}

function respond_json($success, $message) {
    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode([
        "success" => $success,
        "message" => $message
    ]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $formType = clean_input($_POST["form_type"] ?? "");
    $to = "demo@driev.com";
    $headers = "From: FAQ Question <no-reply@flamingoyachtcharters.com>\r\n";

    if ($formType === "faq_question") {
        $boatName = clean_input($_POST["boat_name"] ?? "");
        $tripDate = clean_input($_POST["trip_date"] ?? "");
        $startTime = clean_input($_POST["start_time"] ?? "");
        $question = clean_input($_POST["question"] ?? "");

        if (!$boatName || !$tripDate || !$startTime || !$question) {
            $error = "Please fill in all fields.";
        } else {
            $formattedDate = format_trip_date($tripDate);
            $formattedTime = format_start_time($startTime);
            $subject = $boatName . " - " . $formattedTime;
            $body = "Date: " . $formattedDate . "\n"
                  . "Start Time: " . $formattedTime . "\n"
                  . "Question: " . $question;

            if (mail($to, $subject, $body, $headers)) {
                $success = "Question sent successfully.";
            } else {
                $error = "Question failed to send. Try again later.";
            }
        }

        if (is_ajax_request()) {
            respond_json((bool) $success, $success ?: $error);
        }
    } else {
        $name = clean_input($_POST["name"] ?? "");
        $email = clean_input($_POST["email"] ?? "");
        $message = clean_input($_POST["message"] ?? "");

        if (!$name || !$email || !$message) {
            $error = "Please fill in all fields.";
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $error = "Enter a valid email address.";
        } else {
            $subject = "New Contact Form Message";
            $body = "You received a new message:\n\n"
                  . "Name: " . $name . "\n"
                  . "Email: " . $email . "\n\n"
                  . "Message:\n" . $message;
            $contactHeaders = $headers . "Reply-To: " . $email . "\r\n";

            if (mail($to, $subject, $body, $contactHeaders)) {
                $success = "Message sent successfully.";
            } else {
                $error = "Message failed to send. Try again later.";
            }
        }

        if (is_ajax_request()) {
            respond_json((bool) $success, $success ?: $error);
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Contact</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body {
    margin: 0;
    min-height: 100vh;
    display: grid;
    place-items: center;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: #f5f2eb;
}

.status-card {
    padding: 24px 28px;
    border-radius: 16px;
    background: #fff;
    border: 1px solid rgba(17, 23, 29, 0.08);
    box-shadow: 0 12px 28px rgba(15, 34, 48, 0.08);
}
</style>
</head>
<body>
<div class="status-card">
    <?php echo $success ? $success : ($error ? $error : "Ready."); ?>
</div>
</body>
</html>
