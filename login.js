$(document).ready(function(){
    $("form#loginForm").submit(function() { // loginForm отправлена
        var username = $('#username').attr('value'); // получить username
        var password = $('#password').attr('value'); // получить password

        if (username && password) { // значения не пусты
            $.ajax({
                type: "GET",
                url: "/cgi-bin/login.pl", // URL-адрес Perl-сценария
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                // отправка username и password в качестве параметров в Perl-сценарий
                data: "username=" + username + "&password=" + password,
                // вызов сценария был *не* успешным
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    $('div#loginResult').text("responseText: " + XMLHttpRequest.responseText
                        + ", textStatus: " + textStatus
                        + ", errorThrown: " + errorThrown);
                    $('div#loginResult').addClass("error");
                }, // ошибка
                // вызов сценария был успешным
                // данные содержат JSON-значения, возвращенные Perl-сценарием
                success: function(data){
                    if (data.error) { // сценарий возвратил ошибку
                        $('div#loginResult').text("data.error: " + data.error);
                        $('div#loginResult').addClass("error");
                    } // если
                    else { // вход в систему был успешным
                        $('form#loginForm').hide();
                        $('div#loginResult').text("data.success: " + data.success
                            + ", data.userid: " + data.userid);
                        $('div#loginResult').addClass("success");
                    } //иначе
                } // успех
            }); // ajax
        } // если
        else {
            $('div#loginResult').text("enter username and password");
            $('div#loginResult').addClass("error");
        } // иначе
        $('div#loginResult').fadeIn();
        return false;
    });
});
/**
 * Created by aloginov on 14.04.2017.
 */
