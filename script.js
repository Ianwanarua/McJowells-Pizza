//business logic
function Order(type, size, crust, topping) {
    this.type = type;
    this.size = size;
    this.crust = crust;
    this.topping = topping;
}

//get crust price
Order.prototype.getCrust = function () {
    if (this.crust === 0) {
        return 50
    } else if (this.crust === 1) {
        return 100
    } else if (this.crust === 2) {
        return 150
    }
}

//get topping price
Order.prototype.getTopping = function () {
    if (this.topping === 0) {
        return 50
    } else if (this.topping === 1) {
        return 100
    } else if (this.topping === 2) {
        return 150
    } else if (this.topping === 3) {
        return 200
    }
    else if (this.topping ===4) {
        return 250
    }
}


//get size price
Order.prototype.getSize = function () {

    var count = $("#topping :selected").length;
    //small pizza 350
    if (this.type == 0) {
        if (count === 0) {
            return 400
        }
         else if (count === 1)
            return 450
        else {
            return 550
        }
    }
   else if (this.type == 1) {
        if (count === 0) {
            return 700
        } else if (count === 1)
            return 800
        else {
            return 1500
        }
    } 
    else if (this.type == 2) {
        if (count === 0) {
            return 800
        } else if (count === 1)
            return 1000
        else {
            return 1800
        }
    } 
    else if (this.type == 3) {
        if (count === 0) {
            return 900
        } else if (count === 1)
            return 1500
        else {
            return 2000
        }
    }
    else if (this.type == 4) {
        if (count === 0) {
            return 500
        } else if (count === 1)
            return 950
        else {
            return 2500
        }
    } 
    else if (this.type == 5) {
        if (count === 0) {
            return 400
        } else if (count === 1)
            return 1000
        else {
            return 2400
        }
    } 
    else {
        return false;
    }
}

//user Interface
//calculate total cost 
function fullBill() {
    var areaLocation = document.getElementById("myArea").value;
        var add = 0;
    $(".total_pizza").each(function () {
        var value = $(this).text();
        if (!isNaN(value) && value.length != 0) {
            add += parseFloat(value);
        }
    });
    if (document.getElementById('yes').checked) {
        var result = "Your order is Ksh. " + add + " with a delivery fee of Ksh. 100 ";
        var orderBill = add + 100;
        var total = "Total: Ksh. " + orderBill + " .00";
        $('#result').text(result);
        $('#totalCost').text(total);

        swal({
            title: "Your order will be delivered to " + areaLocation + " at kshs 100. ",
            icon: "success",
        })

    } else {
        var total = "Total: Ksh. " + add + " .00";
        $('#totalCost').text(total)
    }
}

//checkout button
function checkout() {
    swal({
        title: "Your order has been taken." + "\r\n" + "Thank You for choosing Mcjowells Pizza",
        icon: "success",
    }).then((value) => {
        location.reload();
    });
}

$(document).ready(function () {
    //sidebar nav
   $('.nav_icon').click(function (){
       $('.sidebar').toggle();
   })
   
   //hide nav on screen resize
   $(window). resize(function(){
       $('.sidebar').hide();
   })
   
    //display location field if delivered
    $('.radioBtn').change(function () {
        if (document.getElementById("yes").checked) {
            $('.location').show();
        } else {
            $('.location').hide();
        }
    });

    $('#addToCart').click(function () {
        var type = $('#type option:selected').val();
        var size = $('#size option:selected').val();
        var crust = $('#crust option:selected').val();
        var quantity = $('#quantity').val();
        var topping = $('#topping option:selected').val();
        var name = $('#name').val();

        //validate fields
        if (type == '' || size == '' || crust == '' || topping == '' || quantity ==  '') {
            alert('Please make a complete order first')
        } else if (document.getElementById("yes").checked && $('#location').val() == '') {
            alert('Please fill out your location')
        } else {
            var selectedType = parseInt($('#type option:selected').val());
            var selectedSize = parseInt($('#size option:selected').val());
            var selectedCrust = parseInt($('#crust option:selected').val());
            var quantity = parseInt($('#quantity').val());
            var selectedTopping = parseInt($('#topping option:selected').val());

            //create new object
            var newOrder = new Order(selectedType, selectedSize, selectedCrust, selectedTopping);

            //price per order
            var pizzaBill = (newOrder.getSize() + newOrder.getCrust() + newOrder.getTopping()) * quantity;

            //append data to table
            $('.form_table').show();
            $(".table tbody:last").append("<tr>" +
                "<td>" + $('#type option:selected').text() + "</td>" +
                "<td>" + $('#crust option:selected').text() + "</td>" +
                "<td>" + $('#size option:selected').text() + "</td>" +
                "<td>" + $('#topping option:selected').text() + "</td>" +
                "<td>" + $('#quantity').val() + "</td>" +
                "<td><span class='total_pizza'>" + pizzaBill + "</span></td>" +
                "</tr>");
            $(fullBill);
        }
    })
    $('#checkout').click(function () {
        checkout();
    })
})

