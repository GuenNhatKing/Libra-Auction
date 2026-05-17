package io.github.guennhatking.libra_auction.validators;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = FutureTimeValidator.class)
@Documented
public @interface FutureTime {
    String message() default "Start time must be in the future";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
