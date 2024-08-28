// document.getElementById('appointmentForm').addEventListener('submit', function(e) {
//     e.preventDefault();
  
//     const name = document.getElementById('name').value;
//     const contact = document.getElementById('contact').value;
//     const age = document.getElementById('age').value;
//     const gender = document.getElementById('gender').value;
//     const slots = document.getElementById('slots').value;
//     const payment = document.getElementById('payment').value;
//     const uniqueId = 'APPT' + Date.now();
  
//     const appointmentLetter = `
//       Appointment Confirmation
//       ------------------------
//       Name: ${name}
//       Contact: ${contact}
//       Age: ${age}
//       Gender: ${gender}
//       Slot: ${slots}
//       Payment: ${payment}
//       Unique ID: ${uniqueId}
//     `;
  
//     const blob = new Blob([appointmentLetter], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `${uniqueId}.pdf`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
  
//     alert('Appointment booked successfully!');
//   });


document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const HN =   document.getElementById('hosname').value;
    const contact = document.getElementById('contact').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const slots = document.getElementById('slots').value;
    const payment = document.getElementById('payment').value;
    const uniqueId = 'APPT' + Date.now();
  
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    doc.text(`Appointment Confirmation`, 10, 10);
    doc.text(`------------------------`, 10, 20);
    doc.text(`Name: ${name}`, 10, 30);
    doc.text(`Contact: ${contact}`, 10, 40);
    doc.text(`Age: ${age}`, 10, 50);
    doc.text(`Gender: ${gender}`, 10, 60);
    doc.text(`Slot: ${slots}`, 10, 70);
    doc.text(`Payment: ${payment}`, 10, 80);
    doc.text(`Unique ID: ${uniqueId}`, 10, 90);
    doc.text(`Hospital Name:${HN}`, 10, 100);
  
    doc.save(`${uniqueId}.pdf`);
  
    alert('Appointment booked successfully!');
  });