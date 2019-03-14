$(document).ready(function() {

  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address">' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-phone">Phone</label>' +
                                   '<input type="text" class="form-control new-phone">' +
                                 '</div>' +
                               '</div>');
  });
  console.log("test 1");

  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var inputtedPhone = $(this).find("input.new-phone").val();
      var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedPhone)
      newContact.addresses.push(newAddress)
      console.log(newAddress);
    });

    console.log(newContact);

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");

      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
      newContact.addresses.forEach(function(address) {
        if(address.phone!="") {
          $("ul#phones").append("<li>" + address.phone + "</li>");
        }
      });
    });

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");
    $("input.new-phone").val("");
  });
});

function AddressBook() {
  this.contacts = []
}

AddressBook.prototype.addContact = function(contact) {
  this.contacts.push(contact);
}

function Contact(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.addresses = [];
}

function Address(street, city, state, phone = "") {
  this.street = street;
  this.city = city;
  this.state = state;
  this.phone = phone;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Address.prototype.fullAddress = function() {
  return this.street + ", " + this.city + " " + this.state;
}
