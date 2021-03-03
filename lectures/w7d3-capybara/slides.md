# W7D3 - Capybara

![capy_grass](https://raw.githubusercontent.com/appacademy/worldwide-lecture-notes/capybara/rails/w7d3-capybara/assets/capy_grass.jpg?token=AK6ID6KHGQ3KCY5NADEHNY3AI4A32) 

---

## Learning Goals

1. Know what a Capybara is
1. Reinforce testing pyramid and TDD
1. Understand how to test Rails models
1. Understand how to test Rails controllers
1. Become familiar with the Capybara testing library
1. **_Be able to read the specs on Rails 2_**

---

## What is a Capybara?
![capy_with_turtles](https://raw.githubusercontent.com/appacademy/worldwide-lecture-notes/capybara/rails/w7d3-capybara/assets/capy_with_turtles.jpg?token=AK6ID6JLUONVSLXUFBQCV6DAI4A52)

---

## Ugly cousin of the Wombat
![wombat](https://raw.githubusercontent.com/appacademy/worldwide-lecture-notes/capybara/rails/w7d3-capybara/assets/wombat.jpg?token=AK6ID6MVZE66ZA7NIGLU6ITAI4A7M)

---

## Testing Review

![mommy_capy](https://raw.githubusercontent.com/appacademy/worldwide-lecture-notes/capybara/rails/w7d3-capybara/assets/mommy_capy.jpg?token=AK6ID6IQQWJ7YLIA7NJWD4TAI4BA2)


---

### Why Write Tests?

1. Make sure your code works!
1. Prevent regressions
1. Easier collaboration
1. Built-in documentation

![lazy_capy](https://raw.githubusercontent.com/appacademy/worldwide-lecture-notes/capybara/rails/w7d3-capybara/assets/lazy_capy.jpg?token=AK6ID6MKRHWYCIDLPWDCY6TAI4BCM)


---


### The Testing Pyramid

```v
   /  End-to-End Tests \
  /  Integration Tests  \
 /      Unit Tests       \

```
![image](https://raw.githubusercontent.com/appacademy/worldwide-lecture-notes/capybara/rails/w7d3-capybara/assets/capy_pyramid.jpg?token=AK6ID6ORI2OGMTLV3UP7DYLAI4BEQ)

---

- What percentage of our total testing should each of these categories be?
    - `Unit testing`: 80-90%
    - `Integration/Feature testing`: 5-15%
    - `End to End/UI testing`: 1-5%
  - The heavy lifting should occur in the unit tests. If we write good, comprehensive unit tests, then we don't have to write as many integration tests, and barely any E2E tests.

  - Keep asking: "WHAT IS THIS THING RESPONSIBLE FOR?"
    - We should never test more than that, and we should never test less than that.

---

### TDD

1. Red
1. Green
1. Refactor

![crosswalk](https://raw.githubusercontent.com/appacademy/worldwide-lecture-notes/capybara/rails/w7d3-capybara/assets/crosswalk.jpg?token=AK6ID6OH2MVKY5OU6MC35LDAI4BF6)

---

## Rails Testing

* What are the components we typically create in Rails?
  * Models, Controllers, and Views (features)

![capy_with_monkeys](https://raw.githubusercontent.com/appacademy/worldwide-lecture-notes/capybara/rails/w7d3-capybara/assets/capys_with_monkeys.jpg?token=AK6ID6LTDPGBOANDFTUA4TDAI4BHE)

---

## Basic Setup: Adding Testing Gems

* Add RSpec and other testing gems to Gemfile and run `bundle install`
 ```ruby
  # my_app/Gemfile

  group :development, :test do
    gem 'rspec-rails'
    gem 'rails-controller-testing'
    gem 'capybara' # end-to-end feature testing
    gem 'shoulda-matchers' # simple syntax for model tests
    gem 'factory_bot_rails' # easily create test objects
    gem 'faker' # generate random data for testing
    gem 'launchy' # enable save_and_open_page
  end
 ```
---

## Basic Setup: Database, RSpec, and Test Files

* Set up a test database, if necessary
  * `rails db:create` to create development and test databases
  * `rails db:test:load` to sync test DB after migrations
* Install RSpec using `rails generate rspec:install`
  * `.rspec`, `spec/`, `spec_helper.rb`, `rails_helper.rb`
  * add configs to `.rspec` (color, require spec_helper, format_documentation)
* Auto-Generate Test Files
  * change the `config/application.rb` file to use rspec

---
## Basic Setup: Configurations 

`application.rb`
``` ruby
config.generators do |g|
    g.test_framework :rspec, #Tells rails to use rspec for testing
      :fixtures => false, 
      :view_specs => false,
      :helper_specs => false,
      :routing_specs => false,
      :controller_specs => true,
      :request_specs => false
    g.fixture_replacement :factory_bot, :dir => "spec/factories"
end
```
Note: 
  - This slide is optional if you choose not to configure application.rb because you are not using generators 

---

`rails_helper.rb`

```ruby
Shoulda::Matchers.configure do |config|
    config.integrate do |with|
      with.test_framework :rspec
      with.library :rails
    end
  end
```
---

## Demo 1- Show Bluebird Configurations 

---

## Unit Testing: Models

* Small in scope
  * Tests only touch model code
  * Tests can touch the database
* Things to test
  * Validations / error messages
  * Associations
  * Class AND instance methods (not private)
---


## Shoulda Matchers syntax

### validations
```ruby
  it { should validate_presence_of(:username) }
  it { should validate_presence_of(:password_digest) }
  it { should validate_length_of(:password).is_at_least(6) }
```
### associations

```ruby
it { should have_many(:chirps) }
it { should belong_to(:user) }
```
---

## Demo 2 - Model Testing

![stuffed_capy](https://raw.githubusercontent.com/appacademy/worldwide-lecture-notes/capybara/rails/w7d3-capybara/assets/stuffed_capy.jpg?token=AK6ID6IZS2JZP7QWP6PGFLDAI4BI4)

---

## Integration Testing: Controllers

* Scope:
  * controllers, routes, models, database
  * does not test views
* Useful for testing:
  * status codes
  * rendering
  * under various conditions (e.g. Valid and invalid params)

---

## Rails Controller Testing API

* Request Methods
  * get
  * post
  * patch
  * delete
* Assertions
  * render_template
  * redirect_to
  * have_http_status, be_success

---

## Request Syntax

(http request) :(controller action), (params)

```ruby
get :new
post :create, params: { user: { username: "harry_potter" } }
```
---

## Demo 3 - Controller Testing
![capy_monkey](https://raw.githubusercontent.com/appacademy/worldwide-lecture-notes/capybara/rails/w7d3-capybara/assets/capy_monkey.jpg?token=AK6ID6I24RAKBCJVTKQBAHTAI4BLO)

---

## End-to-End Testing: Features

* Simulates how a real user would interact with app
* Test in a "headless" browser (no actual UI)
* Capybara can open a real browser for debugging (`save_and_open_page`)

![capy_alligator](https://raw.githubusercontent.com/appacademy/worldwide-lecture-notes/capybara/rails/w7d3-capybara/assets/capy_alligator.jpg?token=AK6ID6J75K3LFCUVMXN42ODAI4BMW)

---

## Capybara API

* Navigation
  * `visit`
  * `click_on`
* Forms
  * `fill_in "field", with: "value"`
  * `choose`, `check`, `uncheck`
  * `select "option", from: "select box"`

---

## Capybara API

* Assertions
  * `have_content`
  * `current_path`
  * `page`
* Debugging
  * `save_and_open_page`
* [And much more!](https://www.rubydoc.info/github/teamcapybara/capybara/master/Capybara/RSpecMatchers)

---

## Capybara - RSpec Conventions

Capybara changes the names of some of RSpec's standard methods to reflect it's specific testing purpose.

* `#describe` => `#feature`
* `#it` => `#scenario`
* `#before` => `#background`
* `#let` => `#given`

---

## Code Demo - Feature Testing (Capybara)

![yuzu_bath](https://raw.githubusercontent.com/appacademy/worldwide-lecture-notes/capybara/rails/w7d3-capybara/assets/yuzu_bath.jpg?token=AK6ID6OLABZ73P7HZNRRJBLAI4BO6)

---

# [Kahoot](https://play.kahoot.it/v2/?quizId=2930864f-a7c2-47aa-993d-57ead15b7137)

---

# Recap
### Documentation is your friend today! 

---

# Today's Projects
# [Goal App](https://github.com/appacademy/curriculum/tree/master/rails/projects/goal_app)
