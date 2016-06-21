(function () {
    this.Stripe = function () {
        function a() { }
        return a
    }(), this.Stripe.card = function (a) {
        function b() {
            return b.__super__.constructor.apply(this, arguments)
        }
        return b.tokenName = "card", b.whitelistedAttrs = ["number", "cvc", "exp", "exp_month", "exp_year", "name", "address_line1", "address_line2", "address_city", "address_state", "address_zip", "address_country", "currency"], b.validateCardNumber = function (a) {
            return a = (a + "").replace(/\s+|-/g, ""), a.length >= 10 && a.length <= 16 && b.luhnCheck(a)
        }, b.validateCVC = function (a) {
            return a = Stripe.utils.trim(a), /^\d+$/.test(a) && a.length >= 3 && a.length <= 4
        }, b.validateExpiry = function (a, b) {
            var c, d, e, f;
            if (null != b) e = Stripe.utils.trim(a), b = Stripe.utils.trim(b);
            else {
                try {
                    f = Stripe.utils.parseExpString(a), e = f[0], b = f[1]
                } catch (g) {
                    return !1
                }
                e += "", b += ""
            }
            return /^\d+$/.test(e) && /^\d+$/.test(b) && e >= 1 && 12 >= e ? (2 === b.length && (b = 70 > b ? "20" + b : "19" + b), 4 !== b.length ? !1 : (d = new Date(b, e), c = new Date, d.setMonth(d.getMonth() - 1), d.setMonth(d.getMonth() + 1, 1), d > c)) : !1
        }, b.luhnCheck = function (a) {
            var b, c, d, e, f, g;
            for (d = !0, e = 0, c = (a + "").split("").reverse(), f = 0, g = c.length; g > f; f++) b = c[f], b = parseInt(b, 10), (d = !d) && (b *= 2), b > 9 && (b -= 9), e += b;
            return e % 10 === 0
        }, b.cardType = function (a) {
            return b.cardTypes[a.slice(0, 2)] || "Unknown"
        }, b.cardBrand = function (a) {
            return b.cardType(a)
        }, b.cardTypes = function () {
            var a, b, c, d;
            for (b = {}, a = c = 40; 49 >= c; a = ++c) b[a] = "Visa";
            for (a = d = 50; 59 >= d; a = ++d) b[a] = "MasterCard";
            return b[34] = b[37] = "American Express", b[60] = b[62] = b[64] = b[65] = "Discover", b[35] = "JCB", b[30] = b[36] = b[38] = b[39] = "Diners Club", b
        }(), b
    }(), a = ["cardType", "validateExpiry", "validateCVC", "validateCardNumber"];
    for (h = 0, i = a.length; i > h; h++) e = a[h];
    this.Stripe.stripejs_ua = "stripe.js/127787e", "undefined" != typeof module && null !== module && (module.exports = this.Stripe), "function" == typeof define && define("stripe", [], function (a) {
        return function () {
            return a.Stripe
        }
    }(this))
}).call(this),
    function () {
        var a = [].indexOf || function (a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (b in this && this[b] === a) return b;
            return -1
        };
        this.Stripe.isDoubleLoaded || (this.Stripe.utils = function () {
            function b() { }
            var c;
            return c = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, b.trim = function (a) {
                return null === a ? "" : (a + "").replace(c, "")
            }, b.serialize = function (a, b, c) {
                var d, e, f;
                null == b && (b = []);
                try {
                    for (e in a) f = a[e], c && (e = "" + c + "[" + e + "]"), "object" == typeof f ? this.serialize(f, b, e) : b.push("" + e + "=" + encodeURIComponent(f));
                    return b.join("&").replace(/%20/g, "+")
                } catch (g) {
                    throw d = g, new Error("Unable to serialize: " + a)
                }
            }, b.underscore = function (a) {
                return (a + "").replace(/([A-Z])/g, function (a) {
                    return "_" + a.toLowerCase()
                }).replace(/-/g, "_")
            }, b.underscoreKeys = function (a) {
                var b, c, d;
                d = [];
                for (b in a) c = a[b], delete a[b], d.push(a[this.underscore(b)] = c);
                return d
            }, b.isElement = function (a) {
                return "object" != typeof a ? !1 : a.jquery ? !0 : 1 === a.nodeType
            }, b.paramsFromForm = function (b, c) {
                var d, e, f, g, h, i, j, k, l, m;
                for (null == c && (c = []), b.jquery && (b = b[0]), f = b.getElementsByTagName("input"), h = b.getElementsByTagName("select"), i = {}, j = 0, l = f.length; l > j; j++) e = f[j], d = this.underscore(e.getAttribute("data-stripe")), a.call(c, d) < 0 || (i[d] = e.value);
                for (k = 0, m = h.length; m > k; k++) g = h[k], d = this.underscore(g.getAttribute("data-stripe")), a.call(c, d) < 0 || null != g.selectedIndex && (i[d] = g.options[g.selectedIndex].value);
                return i
            }, b.parseExpString = function (a) {
                var b, c, d, e, f, g, h, i, j;
                for (g = function (b) {
                        throw new Error("You passed an invalid expiration date `" + a + "`. " + (b || "") + "Please pass a string containing a numeric month and year such as `01-17` or `2015 / 05`")
                }, "string" != typeof a && g(), f = a.split(/[\.\-\/\s]+/g), 2 !== f.length && g(), b = i = 0, j = f.length; j > i; b = ++i) e = f[b], d = parseInt(e), isNaN(d) && g("" + f + " is not a number. "), 1 > d && g("" + d + " is less than one. "), f[b] = d;
                return f[0] > 12 ? (h = f[0], c = f[1]) : (c = f[0], h = f[1]), c > 12 && g("Month must be a number 1-12, not " + c), 100 > h && (h += 2e3), [c, h]
            }, b
        }())
    }.call(this),
    function () {
        var a = [].indexOf || function (a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (b in this && this[b] === a) return b;
            return -1
        };
        (this.Stripe.validator = {
            "boolean": function (a, b) {
                return "true" !== b && "false" !== b ? "Enter a boolean string (true or false)" : void 0
            },
            integer: function (a, b) {
                return /^\d+$/.test(b) ? void 0 : "Enter an integer"
            },
            positive: function (a, b) {
                return !this.integer(a, b) && parseInt(b, 10) > 0 ? void 0 : "Enter a positive value"
            },
            range: function (b, c) {
                var d;
                return d = parseInt(c, 10), a.call(b, d) < 0 ? "Needs to be between " + b[0] + " and " + b[b.length - 1] : void 0
            },
            required: function (a, b) {
                return !a || null != b && "" !== b ? void 0 : "Required"
            },
            year: function (a, b) {
                return /^\d{4}$/.test(b) ? void 0 : "Enter a 4-digit year"
            },
            birthYear: function (a, b) {
                var c;
                return c = this.year(a, b), c ? c : parseInt(b, 10) > 2e3 ? "You must be over 18" : parseInt(b, 10) < 1900 ? "Enter your birth year" : void 0
            },
            month: function (a, b) {
                return this.integer(a, b) ? "Please enter a month" : this.range([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], b) ? "Needs to be between 1 and 12" : void 0
            },
            choices: function (b, c) {
                return a.call(b, c) < 0 ? "Not an acceptable value for this field" : void 0
            },
            email: function (a, b) {
                return /^[^@<\s>]+@[^@<\s>]+$/.test(b) ? void 0 : "That doesn't look like an email address"
            },
            url: function (a, b) {
                return /^https?:\/\/.+\..+/.test(b) ? void 0 : "Not a valid url"
            },
            usTaxID: function (a, b) {
                return /^\d{2}-?\d{1}-?\d{2}-?\d{4}$/.test(b) ? void 0 : "Not a valid tax ID"
            },
            ein: function (a, b) {
                return /^\d{2}-?\d{7}$/.test(b) ? void 0 : "Not a valid EIN"
            },
            ssnLast4: function (a, b) {
                return /^\d{4}$/.test(b) ? void 0 : "Not a valid last 4 digits for an SSN"
            },
            ownerPersonalID: function (a, b) {
                var c;
                return c = function () {
                    switch (a) {
                        case "CA":
                            return /^\d{3}-?\d{3}-?\d{3}$/.test(b);
                        case "US":
                            return !0
                    }
                }(), c ? void 0 : "Not a valid ID"
            },
            bizTaxID: function (a, b) {
                var c, d, e, f, g, h, i, j;
                if (h = {
                    CA: ["Tax ID", [/^\d{9}$/]],
                    US: ["EIN", [/^\d{2}-?\d{7}$/]]
                }, g = h[a], null != g) {
                    for (c = g[0], f = g[1], d = !1, i = 0, j = f.length; j > i; i++)
                        if (e = f[i], e.test(b)) {
                            d = !0;
                            break
                        }
                    if (!d) return "Not a valid " + c
                }
            },
            zip: function (a, b) {
                var c;
                return c = function () {
                    switch (a.toUpperCase()) {
                        case "CA":
                            return /^[\d\w]{6}$/.test(null != b ? b.replace(/\s+/g, "") : void 0);
                        case "US":
                            return /^\d{5}$/.test(b) || /^\d{9}$/.test(b)
                    }
                }(), c ? void 0 : "Not a valid zip"
            },
            bankAccountNumber: function (a, b) {
                return /^\d{1,17}$/.test(b) ? void 0 : "Invalid bank account number"
            },
            usRoutingNumber: function (a) {
                var b, c, d, e, f, g, h;
                if (!/^\d{9}$/.test(a)) return "Routing number must have 9 digits";
                for (f = 0, b = g = 0, h = a.length - 1; h >= g; b = g += 3) c = 3 * parseInt(a.charAt(b), 10), d = 7 * parseInt(a.charAt(b + 1), 10), e = parseInt(a.charAt(b + 2), 10), f += c + d + e;
                return 0 === f || f % 10 !== 0 ? "Invalid routing number" : void 0
            },
            caRoutingNumber: function (a) {
                return /^\d{5}\-\d{3}$/.test(a) ? void 0 : "Invalid transit number"
            },
            routingNumber: function (a, b) {
                switch (a.toUpperCase()) {
                    case "CA":
                        return this.caRoutingNumber(b);
                    case "US":
                        return this.usRoutingNumber(b)
                }
            },
            phoneNumber: function (a, b) {
                var c;
                return c = b.replace(/[^0-9]/g, ""), 10 !== c.length ? "Invalid phone number" : void 0
            },
            bizDBA: function (a, b) {
                return /^.{1,23}$/.test(b) ? void 0 : "Statement descriptors can only have up to 23 characters"
            },
            nameLength: function (a, b) {
                return 1 === b.length ? "Names need to be longer than one character" : void 0
            }
        })
    }.call(this);