// Initialize available tickets
let earlyBirdTickets = 60;

// Get modal and button elements
let modal = document.getElementById('modal');
let btn = document.getElementById('open-modal');
let span = document.getElementsByClassName('close')[0];

// Open modal when the "Buy Now" button is clicked
btn.onclick = function() {
    modal.style.display = 'block';
}

// Close modal when the user clicks the 'X'
span.onclick = function() {
    modal.style.display = 'none';
}

// Close modal if the user clicks anywhere outside of the modal content
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Handle Paystack payment
function payWithPaystack(customerDetails) {
    let handler = PaystackPop.setup({
        key: 'pk_live_6fd1fb622a2b39f55d30aaaf5b56246f1e226267', // Replace with your Paystack public key
        email: customerDetails.email, // Customer's email
        amount: 200000, // Amount in kobo (2000 Naira = 200000 Kobo)
        currency: 'NGN',
        ref: '' + Math.floor(Math.random() * 1000000000 + 1),
        callback: function(response) {
            alert('Payment successful. Reference: ' + response.reference);
            completePurchase();
        },
        onClose: function() {
            alert('Transaction was not completed.');
        }
    });
    handler.openIframe();
}

function completePurchase() {
    if (earlyBirdTickets > 0) {
        earlyBirdTickets--;
        document.getElementById('early-available').querySelector('span').textContent = earlyBirdTickets;

        if (earlyBirdTickets === 0) {
            alert('Early Bird tickets are sold out!');
            document.getElementById('paystack-button').disabled = true;
        }
    }
}

document.getElementById('purchase-form').addEventListener('submit', function(e) {
    e.preventDefault();

    if (earlyBirdTickets > 0) {
        let customerDetails = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };
        payWithPaystack(customerDetails);
        modal.style.display = 'none'; // Close modal after submitting
    } else {
        alert('Sorry, no more tickets are available.');
    }
});