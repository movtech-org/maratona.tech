/*
// - - - - - - - - - - - - - - - - - - - - - - -
// MARATONA TECH - TEMPLATED - V001
// - - - - - - - - - - - - - - - - - - - - - - -
// a BACK2BASICS
// https://back2basics.com.br
// - - - - - - - - - - - - - - - - - - - - - - -
// deploy > v.00bond a wizardfly
// wizrdfly.rf.gd
// #wf-202202221918
// #wf-202204141644
// - - - - - - - - - - - - - - - - - - - - - - -
*/
// A
// W I Z A R D f l y
// A P P L I C A T I O N
// - - - - - - - - - - - - - - - - - - - -
var Wapp = Wapp || {};
// - - - - - - - - - - - - - - - - - - - -
// M O D U L E
// - - - - - - - - - - - - - - - - - - - -
// FF (fully functions)
// - - - - - - - - - - - - - - - - - - - -
Wapp.FF = Wapp.FF || {};

(function (win, doc, Vars) {
    'use strict';

    /* private Vars */
    Vars = {
        // :: inputs formats :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        inpNumber           : doc.querySelectorAll('.onlyNumber'),
        // :: inputs send ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        btnShowHide         : doc.querySelectorAll('.btnShowHide'),
        // :: buttons scroll :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        btnScroll           : doc.querySelectorAll('.scroll'),
        // :: button send ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        btnSend             : doc.querySelectorAll('.btnSend'),
        // :: code forms :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        // inep                : doc.querySelectorAll('[name="inep"]')[0],
        // confirmInep         : doc.querySelectorAll('[name="confirmInep"]')[0],

        // :: select office ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        slcOffice           : doc.querySelectorAll('[name="office"]'),

        userEmail : '',
    };

    /* init all functions */
    Wapp.FF.Init = function () {
        console.log('FF - fullyfunctions [init]');

        // all listeners
        Wapp.FF.Listen();

        // all masks inputs
        Wapp.FF.FormMask();

        // sliders
        Wapp.FF.Sliders();

        // header fixed
        Wapp.FF.HeaderFixed();

        // -------------------
        // detect color scheme
        // -------------------
        // window.matchMedia("(prefers-color-scheme: dark)").matches;
        // window.matchMedia("(prefers-color-scheme: light)").matches;
        // -------------------
    };

    /* for all events listeners */
    Wapp.FF.Listen = function () {
        // console.log(':: Listen [fnc]');

        // :: format data values
        Wapp.FF.AddEvents('keypress', 'class', Vars.inpNumber, Wapp.FF.OnlyNumber, true);

        // :: button send
        Wapp.FF.AddEvents('click', 'class', Vars.btnSend, Wapp.FF.VerifyForm, true);

        // :: select office
        Wapp.FF.AddEvents('change', 'class', Vars.slcOffice, Wapp.FF.SelectOffice, true);

        // :: boxes show / hide
        Wapp.FF.AddEvents('click', 'class', Vars.btnShowHide, Wapp.FF.ShowHide, true);

        // :: buttons scroll
        Wapp.FF.AddEvents('click', 'class', Vars.btnScroll, Wapp.FF.Scroll, true);

        // :: window scroll
        win.addEventListener('scroll', Wapp.FF.HeaderFixed, true);
    };

    /* add one or more events */
    Wapp.FF.AddEvents = function (evt, type, el, fnc, bol) {
        // console.log(':: AddEvents [fnc]');

        var
            block;

        //for class
        if (type === 'class') {
            [].forEach.call(el, function (block) {
                block.addEventListener(evt, fnc, bol);
            });

        // for id
        } else {
            block = doc.getElementsByClassName(el);
            block.addEventListener(evt, fnc, bol);
        }
    };

    /* header fixed */
    Wapp.FF.HeaderFixed = function () {
        // console.log(':: HeaderFixed [fnc]');

        if (doc.querySelectorAll('.section.header')[0]) {
            if (win.pageYOffset > 0) {
                doc.querySelectorAll('.section.header')[0].classList.add('fixed');

            } else {
                // header not fixed
                doc.querySelectorAll('.section.header')[0].classList.remove('fixed');
            }
        }
    };

    /* Scroll */
    Wapp.FF.Scroll = function (e) {
        // console.log(':: Scroll [fnc]');

        var
            el = '';

        if (e.target.dataset.name) {
            el = doc.querySelectorAll('[name="' + e.target.dataset.name + '"]')[0];
        }

        // console.log('el', el);

        // hide menu
        if (doc.querySelectorAll('.section.header .menu')[0]) {
            doc.querySelectorAll('.section.header .menu')[0].classList.remove('active');

            // ------------------------------------
            // add effects/background box header
            // ------------------------------------
            // if (e.target.dataset.el === '.menu'){
                if (doc.querySelectorAll('.section.header')[0]) {
                    doc.querySelectorAll('.section.header')[0].classList.remove('rmvEffects');
                }
            // }
        }

        // console.log('e', e);
        // console.log('e.target', e.target);
        // console.log('el', el);

        if (el) {
            win.scrollTo({
                'behavior': 'smooth',
                'left': 0,
                'top': el.offsetTop - 65 // 65 = header height px
            });
        }

        e.preventDefault();
        return false;
    };

    /* Verify Form */
    Wapp.FF.VerifyForm = function (e) {
        // console.log(':: VerifyForm [fnc]');

        var
            data = '',
            nObj = {},
            form = doc.getElementById(e.target.dataset.form),
            error = false,
            regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (form) {
            // all elements
            [].forEach.call(form.querySelectorAll('input[type="text"], input[type="email"], input[type="checkbox"], input[type="radio"], input[type="hidden"], select, textarea'), function (el) {
                // console.log('el', el);
                // console.log('el.required', el.required);

                // required
                if (el.required) {
                	// type hidden
                	if (el.type === 'hidden') {
                		// console.log('input hidden', el);

                	} else {
	                    if (el.value === '') {
	                        el.classList.add('error');
	                        error = true;

	                    } else {
	                        el.classList.remove('error');

	                        // EMAIL
	                        // if (el.name === 'email') {
                            if (el.classList.contains('inpEmail')) {
	                            if (!regEmail.test(el.value)) {
	                                el.classList.add('error');
	                                error = true;

	                            } else {
	                                el.classList.remove('error');

                                    Vars.userEmail = el.value;
	                            }

	                        // PHONE
	                        } else if (el.name === 'TELEFONE') {
	                            // if (el.value.length < (el.maxLength - 1)) {
                                if (el.value.length < el.maxLength) {
	                                el.classList.add('error');
	                                error = true;

	                            } else {
	                                el.classList.remove('error');
	                            }

                            // CODES [inep - confirmInep]
                            } else if (el.name === 'inep') {
                                // if (el.value.length < (el.maxLength - 1)) {
                                if (el.value.length < el.maxLength) {
                                    el.classList.add('error');

                                    // error input confirmInep
                                    if (form.querySelectorAll('[name="confirmInep"]')[0]) {
                                        form.querySelectorAll('[name="confirmInep"]')[0].classList.add('error');
                                    }

                                    error = true;

                                } else {
                                    // error input confirmInep
                                    if (form.querySelectorAll('[name="confirmInep"]')[0]) {
                                        // form.querySelectorAll('[name="confirmInep"]')[0].classList.add('error');

                                        if ((el.value < '11000000') || (el.value > '53999999')) {
                                            el.classList.add('error');
                                            form.querySelectorAll('[name="confirmInep"]')[0].classList.add('error');
                                            error = true;

                                        } else {
                                            if (el.value !== form.querySelectorAll('[name="confirmInep"]')[0].value) {
                                                el.classList.add('error');
                                                form.querySelectorAll('[name="confirmInep"]')[0].classList.add('error');
                                                error = true;

                                            } else {
                                                el.classList.remove('error');
                                                form.querySelectorAll('[name="confirmInep"]')[0].classList.remove('error');
                                            }
                                        }
                                    }

                                    // el.classList.remove('error');
                                }

                            // TERMS
	                        } else if (el.type === 'radio') {
                                if (el.checked === true) {
                                    el.parentElement.classList.remove('error');

                                } else {
                                    el.parentElement.classList.add('error');
                                    error = true;
                                }
                            }
	                    }
					}
                }

                // json type DATA
                nObj[el.name] = el.value;

                data = nObj;
            });

            console.log('DATA:', data);
            console.log('ERROR?', error);

            if (error) {
                e.preventDefault();
                return false;
            }

            // console.log('>>>>', data);

            // send data
            Wapp.FF.SendData(e, form.method, form.action, data, form, e.target);
        }

        e.preventDefault();
        return false;
    };

    /* send data ajax */
    Wapp.FF.SendData = function (e, method, url, data, form, button) {
        console.log(':: SendData [fnc]');

        console.log('-------------------');
        console.log('e', e);
        console.log('method', method);
        console.log('url', url);
        console.log('data', data);
        console.log('form', form);
        console.log('button', button);
        console.log('-------------------');

        // button SEND disabled
        if (button) {
            button.disabled = true;
        }

        var
            ajax = new XMLHttpRequest();

        // disabled button send
        e.target.disabled = true;

        // AJAX
        ajax.open(method, url, true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send(data);

        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4) {
                if (ajax.status === 200){
                    // ajax: SUCCESS
                    // *****************
                    // console.log('AJAX - SEND Successfully!',  ajax.responseText);

                    Wapp.FF.AjaxComplete(e, form, ajax.responseText, button, 'SUCCESS', data);

                } else {
                    // ajax: ERROR
                    // ***********
                    // console.log('AJAX - SEND Error!',  ajax.returnText);

                    Wapp.FF.AjaxComplete(e, form, ajax.responseText, button, 'ERROR', data);
                }
            }
        };

        e.preventDefault();
        return false;
    };

    /* ajax complete */
    Wapp.FF.AjaxComplete = function (e, form, obj, button, status, data) {
        console.log(':: AjaxComplete [fnc]');

        console.log('-------------------');
        console.log('e', e);
        console.log('form', form);
        // console.log('obj', obj);
        console.log('button', button);
        console.log('>>> status', status);
        console.log('data', data);
        console.log('-------------------');

        // button SEND disabled
        if (button) {
            button.disabled = false;
        }

        // reset form
        form.reset();

        // show msg
        Wapp.FF.Message('Mensagem de retorno', 'mensagem manual text', obj, form, status);

        // ---------------------------------------------
        // ENABLED download file PDF for FORM formNotice
        // ---------------------------------------------
        // console.log('form PDF?', form);

        if (form.id === 'formNotice') {
            // console.log('ENABLED PDF FILE');

            var
                dataUri = 'pdf/Edital-Maratona-Tech.pdf',
                exportFileDefaultName = 'Edital-Maratona-Tech.pdf',
                linkElement = doc.createElement('a');

            // console.log('linkElement', linkElement);

            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        }
        // ---------------------------------------------

        // if (obj) {
            // if (JSON.parse(obj).status === true) {

                // if (status === 'SUCCESS') {
                    // -----------------------------
                    // GTAG GA
                    // -----------------------------
                    win.dataLayer = win.dataLayer || [];
                    function gtag(){win.dataLayer.push(arguments);}
                    // gtag('js', new Date());
                    // gtag('config', 'GTM-5JQ67H');

                    gtag('event', 'form.submit', {
                        'event_category': 'Formulário ' + form.id,
                        'event_label': 'E-mail do formulário',
                        'event_action': 'Envio de formulário',
                        'event_email': Vars.userEmail
                        // 'value': 'lp'
                    });

                    console.log('dataLayer', win.dataLayer);
                // }
            // }
        // }
    };

    /* Message */
    Wapp.FF.Message = function (title, message, obj, form, status) {
        console.log(':: Message [fnc]');

        console.log('-------------------');
        console.log('title', title);
        console.log('message', message);
        // console.log('obj', obj);
        console.log('form', form);
        console.log('status', status);
        console.log('-------------------');

        var
            box = doc.querySelectorAll('.section.message')[0],
            newTitle = '',
            newContent = '',
            styleStatus = '';

        /*
        // change JSON
        obj = JSON.parse(obj);
        */

        // status title
        // if (obj.status === true) {
        if (status === 'SUCCESS') {
            //reset form
            form.reset();

            // set title
            newTitle = 'ENVIADO COM SUCESSO!';

            // set style box
            styleStatus = 'successSend';

        // } else if (obj.status === false) {
        } else if (status === 'ERROR') {
            // set title
            newTitle = 'OCORREU UM ERRO AO ENVIAR!';

            // set style box
            styleStatus = 'errorSend';
        }

        /*
        // ---------------------
        // verify return
        // ---------------------
        // SUCCESS [send]
        if (status === 'SUCCESS') {
            newContent = obj.resposta;

        // ERROR [send]
        } else if (status === 'ERROR') {
            newContent = obj.resposta;
        }
        */

        // populate infos
        if (box) {
            // title
            if (box.querySelectorAll('h3.title')[0]) {
                box.querySelectorAll('h3.title')[0].innerHTML = newTitle;
            }

            // content
            if (box.querySelectorAll('p')[0]) {
                box.querySelectorAll('p')[0].innerHTML = newContent;
            }
        }

        // send code
        // chaonge texts
        // if (frm.id === 'formCode') {
        //     console.log('MESSAGE FORM CODE');
        // }

        // set style status
        box.classList.add(styleStatus);

        // show box
        box.classList.add('active');

        setTimeout(function () {
            // hide box
            box.classList.remove('active');

            // reset style status
            box.classList.remove(styleStatus);
        }, 4500);
    };

    /* show / hide element */
    Wapp.FF.ShowHide = function (e) {
        // console.log(':: ShowHide [fnc]');

        // from element
        if ((e.target.dataset.el) && (e.target.dataset.cls)) {
            if (doc.querySelectorAll(e.target.dataset.el)) {
                [].forEach.call(doc.querySelectorAll(e.target.dataset.el), function (el) {
                    // console.log('el', el);

                    if (el.classList.contains(e.target.dataset.cls)) {
                        el.classList.remove(e.target.dataset.cls);

                        // ------------------------------------
                        // add effects/background box header
                        // ------------------------------------
                        if (e.target.dataset.el === '.menu'){
                            if (doc.querySelectorAll('.section.header')[0]) {
                                doc.querySelectorAll('.section.header')[0].classList.remove('rmvEffects');
                            }
                        }

                    } else {
                        el.classList.add(e.target.dataset.cls);

                        // ------------------------------------
                        // remove effects/background box header
                        // ------------------------------------
                        if (e.target.dataset.el === '.menu'){
                            if (doc.querySelectorAll('.section.header')[0]) {
                                doc.querySelectorAll('.section.header')[0].classList.add('rmvEffects');
                            }
                        }
                    }
                });
            }

        // from parent
        } else {
            // remove cls
            if (e.target.parentElement) {
                if (e.target.parentElement) {
                    if (e.target.parentElement.classList.contains('active')) {
                        e.target.parentElement.classList.remove('active');

                    } else {
                        e.target.parentElement.classList.add('active');
                    }
                }
            }
        }

        e.preventDefault();
        return false;
    };

    /* all sliders */
    Wapp.FF.Sliders = function () {
        // slider testimony
        $('.sldTestimony').owlCarousel({
            autoplay:true,
            autoplayTimeout:5000,
            autoplayHoverPause:true,
            items: 2,
            margin: 50,
            dots: true,
            nav: true,
            navText: ['<i class="spr icoArrowLeftTestimony"></i>', '<i class="spr icoArrowRightTestimony"></i>'],
            loop: true,
            responsive:{
                0:{
                    items:1
                },
                990:{
                    items:2
                }
            }
        });
    };

    /**
    * OnlyNumber
    * @constructor
    * @e {event} - e Event.
    */
    Wapp.FF.OnlyNumber = function (e) {
        // console.log(':: OnlyNumber [fnc]');

        var
            regex = /[0-9]|\,/,
            key = e.keyCode || e.which;

        key = String.fromCharCode(key);

        if (!regex.test(key)) {
            e.preventDefault();
            return false;

        } else {
            return true;
        }
    };

    /* all masks input */
    Wapp.FF.FormMask = function (e) {
        // console.log(':: FormMask [fnc]');

        var
            behavior = '',
            options = '';

        behavior = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        };

        options = {
            onKeyPress: function (val, e, field, options) {
                field.mask(behavior.apply({}, arguments), options);
            }
        };

        $(doc).ready(function () {
            // $('.mCpf').mask('999.999.999-99');
            // $('.mCnpj').mask('99.999.999/9999-99');
            $('.mPhone').mask(behavior, options);
            // $('.mDoc').mask(behavior, options);
            // $('.mCep').mask('99.999-999');
        });
    };

    /* show / hide input office */
    Wapp.FF.SelectOffice = function (e) {
        // console.log(':: SelectOffice [fnc]');

        // console.log('e.target', e.target);
        // console.log('e.target.value', e.target.value);

        if (doc.querySelectorAll('.boxOthers')[0]) {
            if (e.target.value === 'Outros') {
                doc.querySelectorAll('.boxOthers')[0].classList.add('active');

                // add required
                if (doc.querySelectorAll('.boxOthers input')[0]) {
                    doc.querySelectorAll('.boxOthers input')[0].required = true;
                }

            } else {
                doc.querySelectorAll('.boxOthers')[0].classList.remove('active');

                // remove required
                if (doc.querySelectorAll('.boxOthers input')[0]) {
                    doc.querySelectorAll('.boxOthers input')[0].required = false;
                }
            }
        }
    };

    /* instantiation this module in window load */
    win.addEventListener('DOMContentLoaded', Wapp.FF.Init, true);

    // manual init
    // Wapp.FF.Init();

})(window, document, 'Private');