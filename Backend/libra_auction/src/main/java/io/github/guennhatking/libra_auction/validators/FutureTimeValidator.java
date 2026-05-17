package io.github.guennhatking.libra_auction.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.OffsetDateTime;

public class FutureTimeValidator implements ConstraintValidator<FutureTime, OffsetDateTime> {

    @Override
    public void initialize(FutureTime constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(OffsetDateTime value, ConstraintValidatorContext context) {
        if (value == null) {
            return true; // null values are handled by @NotNull
        }
        return value.isAfter(OffsetDateTime.now());
    }
}
