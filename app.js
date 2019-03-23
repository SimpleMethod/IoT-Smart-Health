var app = angular.module("myApp", ["ngRoute"]).controller("MultiController");


app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : 'pages/home.html'
        })
        .when("/patient", {
            templateUrl : 'pages/patient.html'
        })
        .when("/doctor", {
            templateUrl : 'pages/doctor.html'
        });
});

var PL = {
    "patient_template": "Piotr Piasecki",
    "doctor_name": "Jan Nowak",
    "footer": "Copyright ©M&N 2019",
    "index_main_container": "Projekt interfejsu do projektu Smart Health",
    "index_main_container_samll": "Klient ogólnego przeznaczenia, do zarządzania pacjentem.",
    "bar_patient_page": "Strona pacjenta",
    "bar_doctor_page": "Strona lekarza",
    "patient_page_title": "Strona pacjenta",
    "patient_page_reported_ailments": "Zgłoszone dolegliwości",
    "patient_page_from": "Od",
    "patient_page_to": "Do",
    "patient_page_type_of_ailments": "Rodzaj dolegliwości",
    "patient_page_date": "Data",
    "patient_page_a_doses_of_medicines": "Dawka leku",
    "patient_page_doses_of_medicines": "Dawki leku",
    "patient_page_graph_of_vital_signs": "Wykres funkcji życiowych",
    "doctor_page_title": "Strona lekarza",
    "doctor_page_information_about_patient": "Informacja o pacjencie",
    "doctor_page_information_dosage": "Dawkowanie",
    "doctor_page_ip_address": "IP:",
    "doctor_page_ip_patient": "Pacjent:",
    "doctor_page_temp_patient": "Temperatura ciała:",
    "doctor_page_pulse_patient": "Tętno:",
    "doctor_page_0_tablets": "Brak tabletek",
    "doctor_page_1_tablets": "Jedna tabletek",
    "doctor_page_2_tablets":"Dwie tabletki"
};


app.controller('MultiController', function ($scope) {
    $scope.patient_template = PL.patient_template;
    $scope.doctor_name = PL.doctor_name;
    $scope.footer = PL.footer;
    $scope.index_main_container = PL.index_main_container;
    $scope.index_main_container_samll = PL.index_main_container_samll;
    $scope.bar_patient_page = PL.bar_patient_page;
    $scope.bar_doctor_page = PL.bar_doctor_page;
    $scope.patient_page_title = PL.patient_page_title;
    $scope.patient_page_reported_ailments = PL.patient_page_reported_ailments;
    $scope.patient_page_from = PL.patient_page_from;
    $scope.patient_page_to = PL.patient_page_to;
    $scope.patient_page_type_of_ailments = PL.patient_page_type_of_ailments;
    $scope.patient_page_date = PL.patient_page_date;
    $scope.patient_page_a_doses_of_medicines = PL.patient_page_a_doses_of_medicines;
    $scope.patient_page_doses_of_medicines = PL.patient_page_doses_of_medicines;
    $scope.patient_page_graph_of_vital_signs = PL.patient_page_graph_of_vital_signs;
    $scope.doctor_page_title = PL.doctor_page_title;
    $scope.doctor_page_reported_title = PL.doctor_page_reported_title;
    $scope.doctor_page_information_about_patient = PL.doctor_page_information_about_patient;
    $scope.doctor_page_information_dosage = PL.doctor_page_information_dosage;
    $scope.doctor_page_ip_address = PL.doctor_page_ip_address;
    $scope.doctor_page_ip_patient = PL.doctor_page_ip_patient;
    $scope.doctor_page_temp_patient = PL.doctor_page_temp_patient;
    $scope.doctor_page_pulse_patient = PL.doctor_page_pulse_patient;
    $scope.doctor_page_0_tablets = PL.doctor_page_0_tablets;
    $scope.doctor_page_1_tablets = PL.doctor_page_1_tablets;
    $scope.doctor_page_2_tablets = PL.doctor_page_2_tablets;
});
