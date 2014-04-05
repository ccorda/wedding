<!doctype html>
<html class="no-js">
<head>
    <meta charset="utf-8">
    <title>gulp</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

    <link rel="stylesheet" href="css/main.css">
    <!-- modernizr -->

    <script type="text/javascript" src="//use.typekit.net/wpa7qcf.js"></script>
    <script type="text/javascript">try{Typekit.load();}catch(e){}</script>
    <style>
    body {
        font-family: "omnes-pro",sans-serif;
        color: #CEE6E1;
    }
    .intro {
        font-weight: 300;
    }
    .names {
        font-family: "dapifer", serif;
        /*font-variant: small-caps;*/
        font-style: italic;
        text-align: center;

        font-size: 128px;
        color: #F99183;
    }
    .names span {
        font-style: italic;
        font-size: 72px;
    }
    .i {
        font-style: italic;
    }

    </style>

</head>

<body>
    {% block content %}
    {% endblock %}

    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
    <script>
        (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
        function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
        e=o.createElement(i);r=o.getElementsByTagName(i)[0];
        e.src='//www.google-analytics.com/analytics.js';
        r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
        ga('create','UA-XXXXX-X');ga('send','pageview');
    </script>

    <!-- footer js -->
</body>
</html>
