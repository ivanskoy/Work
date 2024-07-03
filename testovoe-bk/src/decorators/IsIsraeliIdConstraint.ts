import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class IsIsraeliIdConstraint implements ValidatorConstraintInterface {
  validate(id: string) {
    let trimmedId = id.trim();
    const maxLength = 9;
    const minLength = 5;

    // Length validation
    if (trimmedId.length > maxLength || trimmedId.length < minLength) {
      return false;
    }

    // Pad string with zeros up to maxLength digits
    trimmedId =
      trimmedId.length < maxLength
        ? ('00000000' + trimmedId).slice(-maxLength)
        : trimmedId;

    // Luhn algorithm
    let sumOdd = 0,
      sumEven = 0;
    for (let i = 0; i < trimmedId.length; i++) {
      const digit = parseInt(trimmedId[i]);

      if (i % 2 === 0) {
        sumEven += digit;
      } else {
        sumOdd += digit * 2 > maxLength ? digit * 2 - maxLength : digit * 2;
      }
    }

    return (sumOdd + sumEven) % 10 === 0;
  }
}
