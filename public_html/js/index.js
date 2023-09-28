/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var empDBName = 'STU-DB';
var empRelationName = 'StuData';
var connToken= '90931671|-31949327208450213|90961502';

$('#RollNo').focus();

function saveRecNo2LS(jsonObj)
{
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno',lvData.rec_no);
}
function getEmpIdAsJsonObj()
{
    var RollNo= $('#RollNo').val();
    var jsonStr = {
        RollNo:RollNo
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj)
{
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $('#Stuname').val(record.Stuname);
    $('#classname').val(record.classname);
    $('#dob').val(record.dob);
    $('#add').val(record.add);
    $('#enroldate').val(record.enroldate);
}
//put all the values as blank.

function resetForm()
{
    $('#RollNo').val('');
    $('#Stuname').val('');
    $('#classname').val('');
    $('#dob').val('');
    $('#add').val('');
    $('#enroldate').val('');
    $('#RollNo').prop('disabled',false);
    $('#save').prop('disabled',true);
    $('#update').prop('disabled',true);
    $('#reset').prop('disabled',true);
    $('#RollNo').focus();
}

function validateDate()
{
    var RollNo, Stuname, classname, dob, add, enroldate;
    RollNo = $('#RollNo').val();
    Stuname = $('#Stuname').val();
    classname = $('#classname').val();
    dob = $('#dob').val();
    add = $('#add').val();
    enroldate = $('#enroldate').val();
    
    if(RollNo==='')
    {
        alert('Roll No missing');
        $('#RollNo').focus();
        return "";
    }
    if(Stuname==='')
    {
        alert('Student Name missing');
        $('#Stuname').focus();
        return "";
    }
    if(classname==='')
    {
        alert('classname missing');
        $('#classname').focus();
        return "";
    }
    if(dob==='')
    {
        alert('DOB missing');
        $('#dob').focus();
        return "";
    }
    if(add==='')
    {
        alert('Address missing');
        $('#add').focus();
        return "";
    }
    if(enroldate==='')
    {
        alert('Enrol Date missing');
        $('#enroldate').focus();
        return "";
    }
    var jsonStrObj = {
        RollNo: RollNo,
        Stuname: Stuname,
        classname :classname,
        dob :dob,
        add:add,
        enroldate :enroldate
    };
    return JSON.stringify(jsonStrObj);
}

function getEmp()
{
    var empIdJsonObj = getEmpIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, empDBName,empRelationName, empIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj=executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if(resJsonObj.status === 400)
    {
        $('#save').prop('disabled',false);
        $('#reset').prop('disabled',false);
        $('#Stuname').focus();
    }
    else if (resJsonObj.status === 200)
    {
        $('#RollNo').prop('disabled',true);
        fillData(resJsonObj);
        $('#update').prop('disabled',false);
        $('#reset').prop('disabled',false);
        $('#Stuname').focus();
    }
}

//for data valdation 
function saveData()
{
    var jsonStrObj = validateDate();
    if(jsonStrObj === '')
    {
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, empDBName, empRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('#RollNo').focus();
}
function changeData()
{
    $('#update').prop('disabled', true);
    jsonChg = validateDate();
    var updateRequest = createPUTRequest(connToken, jsonChg, empDBName, empRelationName, localStorage.getItem('recno'));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $('#RollNo').focus();
}