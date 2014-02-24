var homePage = {
    get: function() {
        browser.get('/')
    }
    ,
    greeting: function() {
        return element(by.binding('greeting'))
    },
    greetingInput: function() {
        return element(by.model('greeting'))
    },
    clearGreeting: function() {
        this.greetingInput().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "a"));
        this.greetingInput().sendKeys(protractor.Key.BACK_SPACE);
        this.greetingInput().clear()
    },
    setGreeting: function(input) {
        this.clearGreeting()
        this.greetingInput().sendKeys(input)
    }
}

describe('Angular Console Home', function() {
    describe('index', function() {
        beforeEach(function() {
            homePage.get()
        })

        it('Should show an initial greeting', function() {
            expect(homePage.greeting().getText()).toEqual("Hello, world!")
        })

        it('Should have the greeting properly bound to the input', function() {
            homePage.setGreeting('Hello, Angular!')
            expect(homePage.greeting().getText()).toEqual('Hello, Angular!')
        })
    })
})