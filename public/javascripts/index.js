const addEmployee = function () {
    this.initialize = function () {
        this.addEmp();
        this.fetchState(); 
        this.fetchCity();
    }

    this.addEmp = function () {
        $("#myForm").submit(async function (event) {
            event.preventDefault();
        }).validate({
            errorClass: "error",
            errorElement: 'p',
            errorPlacement: function (error, element) {
                if (element.attr("name")=="emp_gender" ) {
                    error.insertAfter('.female-radio');   
                }
                else if (element.attr("name") == "country" || element.attr("name") == "state" || element.attr("name") == "city" ) {
                    error.insertAfter('.city'); 
                }
                else {
                    error.insertAfter(element);
                }
            },
            rules: {
                emp_name: "required",
                emp_email: {
                    required: true,
                    email: true
                }, 
                emp_gender: "required",
                emp_department: "required",
                emp_designation: "required",
                emp_resume: "required",
                country: 'required',
                state: 'required',
                city: 'required'
            },
            messages: {
                emp_name: "Please specify your name",
                emp_email: {
                    required: "We need your email address to contact you",
                    email: "Your email address must be in the format of name@domain.com"
                }, 
                emp_gender: "Please specify your gender",
                emp_department: "Please select your department",
                emp_designation: "Please select your designation",
                emp_resume: "Please attach your resume",
                country: 'Please select country for your address',
                state: 'Please select state for your address',
                city: 'Please select city for your address'
            },
            submitHandler:async function(form){
                var data = new FormData(form);
                await $.ajax({
                url: `${location.origin}/employee/add-employee`,
                method: 'POST',
                processData: false,
                contentType:false,
                data:data,
                success: function (result) {
                    $.toast({
                        text: result.message, // Text that is to be shown in the toast
                        heading: result.type, // Optional heading to be shown on the toast
                        icon: result.type, // Type of toast icon
                        showHideTransition: 'slide', // fade, slide or plain
                        allowToastClose: true, // Boolean value true or false
                        hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
                        stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
                        position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
                        textAlign: 'left',  // Text alignment i.e. left, right or center
                        loader: true,  // Whether to show loader or not. True by default
                        loaderBg: '#9EC600',  // Background color of the toast loader
                    });
                    if (result.type == 'success') {
                        setTimeout(() => {
                            location.href=`${location.origin}/employee`
                        },1000)
                    }
                },
                error: function (error) {
                    $.toast({
                        text: error.message, // Text that is to be shown in the toast
                        heading: 'Error', // Optional heading to be shown on the toast
                        icon: 'error', // Type of toast icon
                        showHideTransition: 'slide', // fade, slide or plain
                        allowToastClose: true, // Boolean value true or false
                        hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
                        stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
                        position: 'top-right', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
                        textAlign: 'left',  // Text alignment i.e. left, right or center
                        loader: true,  // Whether to show loader or not. True by default
                        loaderBg: '#9EC600',  // Background color of the toast loader
                    });
                  console.log(error)
                }
            });
            }
        })
    }

    this.fetchState = function () {
        $(".country").on('change', async function () {
            $('.city').attr("disabled", "disabled").html('<option value="">-Select City-</option>');
            $('.state').removeAttr("disabled").html('<option value="">-Select State-</option>');
            if ($(this).val()=='') {
                $('.state').attr("disabled", "disabled")
            } else {
                await $.ajax({
                    url: `${location.origin}/employee/get-data`,
                    method: 'GET',
                    data: {
                        country: $(this).val(),
                    },
                    success: function (result) {
                        console.log(result);
                        result.states.map(state => {
                            $('.state').append(`<option value="${state}">${state}</option>`);
                        })
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })
            }
        })
    }
    
    this.fetchCity = function () {
        $(".state").on('change', async function () {
            $('.city').removeAttr("disabled").html('<option value="">-Select City-</option>');

            if ($(this).val() == '') {
                $('.city').attr("disabled", "disabled")
            }
            else {
                await $.ajax({
                    url: `${location.origin}/employee/get-data`,
                    method: 'GET',
                    data: {
                        country: $('.country').val(),
                        state: $(this).val(),
                    },
                    success: function (result) {
                        console.log(result);   
                        result.cities.map(city => {
                            $('.city').append(`<option value="${city}">${city}</option>`);
                        })
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })
            }
        })
    }
    
    this.initialize()
}
