import moment from 'moment'

const isEmailUnique = (email: string) => email !== "qwe@gmail.com"
const isWeekday = (date: any) => {
    return moment(date).isoWeekday() >= 1 && moment(date).isoWeekday() <= 5;
};

export const fieldRules = {
    requiredRule : {
        required : "This field is required"
    },
    requiredStringRule : {
        required : "This field is required",
        pattern : {
            value : /^[a-zA-Z\s]*$/,
            message : "Alphabet characters only"
        }
    },
    requiredNumberRule : {
        required : "This field is required",
        pattern : {
            value : /^\d+$/,
            message : "Numeric characters only"
        }
    },
    requiredNumberRule2 : {
        required : "This field is required",
        pattern : {
            value : /^\d+$/,
            message : "Numeric characters only"
        },
        minValue : {
            value : 1,
            message : "Value must be greater than 0"
        }
    },
    requiredMobileNumberRule : {
        required : "This field is required",
        pattern : {
            value : /^\d+$/,
            message : "Numeric characters only"
        },
        minLength : {
            value : 11,
            message : "Input takes 11 numeric characters"
        },
        maxLength : {
            value : 11,
            message : "Input takes 11 numeric characters"
        } 
    },
    requiredUniqueEmailRule : {
        required : "This field is required",
        pattern : {
            value : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            message : "Please enter a valid email"
        },
        validate : isEmailUnique
    },
    requiredPasswordRule : {
        required : "This field is required",
        minLength : {
            value : 8,
            message : "Input takes at least 8 characters"
        }
    },
    requiredDateFieldRule : {
        required : "This field is required",
        min : {
            value : new Date().toString(),
            message : "Date must be greater than today"
        }
    },
    requiredWeekDayRule: {
        required : "This field is required",
        validate : isWeekday,
        min : {
            value : new Date().toString(),
            message : "Date must be greater than today"
        }
    }
}