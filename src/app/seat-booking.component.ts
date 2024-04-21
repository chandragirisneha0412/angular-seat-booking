import { Component } from '@angular/core';

interface Seat {
  number: number;
  booked: boolean;
}

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.css']
})

export class SeatBookingComponent {
  seats: Seat[] = [];
  bookedSeatNumbers: number[] = [];

  constructor() {
    this.seats = initializeSeats();
  }

  bookSeats(numSeats: number) {
    this.bookedSeatNumbers = bookSeats(numSeats, this.seats);
  }

  isBooked(seat: Seat) {
    return seat.booked ? 'Booked' : 'Available';
  }
}

function initializeSeats(): Seat[] {
  const seats: Seat[] = [];
  const rows = 10; // Total rows
  const seatsPerRow = [7, 7, 7, 7, 7, 7, 7, 7, 7, 3]; // Seats per row
  let seatNumber = 1;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < seatsPerRow[i]; j++) {
      seats.push({ number: seatNumber++, booked: false });
    }
  }

  return seats;
}

// Function to book seats
function bookSeats(numSeats: number, seats: Seat[]): number[] {
  const bookedSeats: number[] = [];

  // Helper function to check if seats are available in a row
  function checkAvailabilityInRow(startIndex: number, endIndex: number): boolean {
    for (let i = startIndex; i <= endIndex; i++) {
      if (seats[i].booked) {
        return false;
      }
    }
    return true;
  }

  // Iterate through seats to find available seats
  for (let i = 0; i < seats.length; i++) {
    if (!seats[i].booked) {
      const endIndex = i + numSeats - 1;
      if (endIndex < seats.length && checkAvailabilityInRow(i, endIndex)) {
        for (let j = i; j <= endIndex; j++) {
          seats[j].booked = true;
          bookedSeats.push(seats[j].number);
        }
        break; // Seats booked in one row, exit loop
      } else {
        // Book nearby seats
        for (let j = i; j < seats.length && j < i + numSeats; j++) {
          if (!seats[j].booked) {
            seats[j].booked = true;
            bookedSeats.push(seats[j].number);
          }
        }
        break; // Seats booked nearby, exit loop
      }
    }
  }

  return bookedSeats;
}

