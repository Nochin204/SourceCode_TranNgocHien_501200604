<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hin - MID VIETNAM</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.2/font/bootstrap-icons.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.2/dist/leaflet.css"
        integrity="sha256-sA+zWATbFveLLNqWO2gtiw3HL/lh1giY/Inf1BJ0z14=" crossorigin="" />
    <link rel="stylesheet" href="<?= base_url('/public/css/leaf.css') ?>">
    <link rel="stylesheet" href="<?= base_url('/public/css/playback.css') ?>">
    <link rel="stylesheet" href="<?= base_url('/public/css/style.css') ?>" />
    <link rel="stylesheet" href="<?= base_url('/public/css/res.css') ?>" />
    <script src="<?= base_url('/public/js/leaflet.js') ?>"> </script>
    <script src="<?= base_url('/public/js/control.trackplayback.js') ?>"> </script>
    <script src="<?= base_url('/public/js/leaflet.trackplayback.js') ?>"> </script>
</head>

<body>
    <div class="giaodienchinh">
        <div class="col-2 text-center cottrai">
            <h4>HÀNH TRÌNH</h4>
            <div class="danhsach" id="danhsach">

            </div>
        </div>
        <div class="thitbo">

        </div>
        <div class="dongmo" img-color="pink">
            <i class="fas fa-chevron-right bab"></i>
        </div>
        <div class="col-10 cotphai">
            <div class="navbi">
                <span><i class="fas fa-bezier-curve"></i>Tuyến Đường</span>
                <span><i class="fas fa-tv"></i>Giám Sát</span>
                <span class="tramtrinh">
                    <div class="keoli" id="keoli">

                    </div>
                </span>
            </div>

            <div class="map" id="map"></div>

        </div>
    </div>
</body>
<script src="<?= base_url('/public/js/function.js') ?>"></script>
<script src="<?= base_url('/public/js/main.js') ?>"></script>
<script src="<?= base_url('/public/js/design.js') ?>"></script>
</html>
