function purchaseTicket(ticketType, price) {
    document.getElementById('ticketType').value = ticketType;
    document.getElementById('price').value = `₦${price}`;
    document.getElementById('purchase-form').style.display = 'block';
}

function closeForm() {
    document.getElementById('purchase-form').style.display = 'none';
}

document.getElementById('ticketForm').onsubmit = function(event) {
    event.preventDefault();
    
    // Get form values
    const ticketType = document.getElementById('ticketType').value;
    const price = parseInt(document.getElementById('price').value.replace('₦', '')) * 100; // Convert to kobo
    const fullName = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Initialize Paystack Payment
    var handler = PaystackPop.setup({
        key: 'pk_live_6fd1fb622a2b39f55d30aaaf5b56246f1e226267', // Replace with your Paystack public key
        email: email,
        amount: price,
        currency: 'NGN',
        ref: '21SYNERGY_' + Math.floor((Math.random() * 1000000000) + 1),
        metadata: {
            custom_fields: [
                {
                    display_name: "Full Name",
                    variable_name: "full_name",
                    value: fullName
                },
                {
                    display_name: "Ticket Type",
                    variable_name: "ticket_type",
                    value: ticketType
                }
            ]
        },
        callback: function(response) {
            alert('Payment successful! Reference: ' + response.reference);
            closeForm();
        },
        onClose: function() {
            alert('Payment process was canceled');
        }
    });
    handler.openIframe();
}