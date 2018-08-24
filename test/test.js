import Component from "../js/components/Component.js";
import App from "../js/pages/App.js";
import {Login} from "../js/pages/Login.js";
import {SignUp} from "../js/pages/SignUp.js";
import {Landing} from "../js/pages/Landing.js";
import {Dashboard} from "../js/pages/user/Dashboard.js";
import {NewRequest} from "../js/pages/user/NewRequest.js";

describe('User Pages', () => {
    describe('Dashboard', () => {
        let dashboard;

        beforeEach(() => {
            dashboard = new Dashboard();
        });

        describe("Navigation Bar", () => {
            it("Should have notifications for large screens", () => {
                chai.expect(dashboard.navBarMenu()).to.contains('<div class="mg dropdown notifications"');
            });

            it("Should have a title saying that this is the user panel", () => {
                chai.expect(dashboard.getTitle()).to.contains("User Panel");
            });

            it("Should have a logout button", () => {
                chai.expect(dashboard.element.querySelector("#user-options").innerHTML).to.contains("Logout");
            });
        });

        describe('Sidebar', () => {
            it("Should have the first item as active", () => {
                chai.expect(dashboard.getSidebarActiveItem()).to.equal(0);
            });

            it("Should have a link to go to the dashboard", () => {
                chai.expect(dashboard.sideBarMenu()).to.contains('href="/user"');
            });

            it("Should have a link to go to the requests page", () => {
                chai.expect(dashboard.sideBarMenu()).to.contains('href="requests.html"');
            });

            it("Should have a link to go to the feedback page", () => {
                chai.expect(dashboard.sideBarMenu()).to.contains('href="feedback.html"');
            });

            it("Should have a link to open notifications for small screens", () => {
                chai.expect(dashboard.sideBarMenu()).to.contains('id="mobileNotifications"');
            })
        });
    });

    describe("Make Request", () => {
        let makeRequest;

        beforeEach(() => {
            makeRequest = new NewRequest();
        });

        describe("New Request Form", () => {
            it("Should have a field for product photo", () => {
                chai.expect(makeRequest.mainContent()).to.match(/<input.*name="photo"/);
            });

            it("Should have a field for product name", () => {
                chai.expect(makeRequest.mainContent()).to.match(/<input.*name="product_name"/);
            });

            it("Should have a field for product description", () => {
                chai.expect(makeRequest.mainContent()).to.match(/<textarea.*name="description"/);
            });

            it("Should have a placeholder for the image", () => {
                chai.expect(makeRequest.mainContent()).to.match(/<img src=".*" id="product-photo-img"/);
            });
        })
    })
});
/**
 * Test for the functionality of a component
 */
describe('Component', () => {
    beforeEach(() => {
        // do something
    });

    describe("Element", () => {
        let component;

        beforeEach(() => {
            // create a new Component object before every test
            component = new Component(document.createElement("div"));
        });

        it('Creates an element', () => {
            chai.expect(component.element.tagName).to.equal('DIV');
        });

        it('Creates an empty DOM', () => {
            chai.expect(component.render()).to.equal('');
        });
    });

    describe("#data", () => {
        let component;

        beforeEach(() => {
            component = new Component(document.createElement("div"), {"name": "Moses"})
        });

        it('Should have a value for name', () => {
            chai.expect(component.data).to.have.property('name');
        })
    })
});

/**
 * Test for the functionality of the main layout page
 */
describe('App Layout', () => {
    let app;

    beforeEach(() => {
        app = new App(document.createElement('div'));
    });
    describe("Layout", () => {
        it('Should return an empty navbar menu', () => {
            chai.expect(app.navBarMenu()).to.equal('');
        });

        it('Should have the first item as the active one', () => {
            chai.expect(app.getSidebarActiveItem()).to.equal(0);
        });

        it('Should not have any sidebar menu items', () => {
            chai.expect(app.getSideBarMenuItems()).to.have.length(0);
        });

        it('Should not have a sidebar menu', () => {
            chai.expect(app.sideBarMenu()).to.equal('');
        });

        it('Should have a sidebar with no menu', () => {
            chai.expect(app.getSideBar()).to.equalIgnoreSpaces(`<div class="mg sidebar" data-trigger="openSidebar"></div>`);
        });

        it('Should have a navbar', () => {
            chai.expect(app.navBar()).to.equalIgnoreSpaces(`
                <div class="mg navbar">
                    <div class="header padded left">Maintenance Tracker</div>
                        <div class="menu">
                    </div>
                </div>`);
        });

        it('Should have a title', () => {
            chai.expect(app.getTitle()).to.equal("Maintenance Tracker");
        });

        it('Should display a page with navbar and content', () => {
            chai.expect(app.render()).to.equalIgnoreSpaces(`
                    <div class="mg pushable">
                        <div class="mg navbar">
                            <div class="header padded left">Maintenance Tracker</div>
                                <div class="menu">
                            </div>
                        </div>
                        <div class="mg content">
                        </div>
                    </div> 
                `);
        })
    })
});

describe("Login Page", () => {
    let login;

    beforeEach(() => {
        login = new Login(document.createElement("div"));
    });

    describe("Navbar", () => {
        it("Should display a phone number", () => {
            chai.expect(login.navBarMenu()).to.contains("+254705045048");
        });
    });

    describe("LoginForm", () => {
        it("Should have username field", () => {
            chai.expect(login.getForm()).to.match(/<input.*name="username".*/);
        });

        it("Should have a password field", () => {
            chai.expect(login.getForm()).to.match(/<input.*name="password".*/);
        });

        it("Should have a login button", () => {
            chai.expect(login.getForm()).to.match(/<button.*>Login<\/button>/);
        });

        it("Should have a title", () => {
            chai.expect(login.getFormTitle()).to.equal("Log in");
        })
    });

    describe("Footer", () => {
        it("Should direct user to registration page", () => {
            chai.expect(login.getFormFooter()).to.containIgnoreSpaces("register.html");
        })
    })
});

/**
 Testing for sign up page functionality
 */

describe("Sign Up Page", () => {
    let signUp;

    beforeEach(() => {
        signUp = new SignUp();
    });

    describe("Sign Up Form", () => {
        it("Should have a first name and last name field", () => {
            chai.expect(signUp.getForm()).to.match(/<input.*name="firstname"/);
            chai.expect(signUp.getForm()).to.match(/<input.*name="lastname"/);
        });

        it("Should have an email field", () => {
            chai.expect(signUp.getForm()).to.match(/<input.*name="email"/);
        });

        it("Should have a username field", () => {
            chai.expect(signUp.getForm()).to.match(/<input.*name="username"/);
        });

        it("Should have a password field", () => {
            chai.expect(signUp.getForm()).to.match(/<input.*name="password"/);
        });

        it("Should have a confirm password field", () => {
            chai.expect(signUp.getForm()).to.match(/<input.*id="confirm_password"/);
        });

        it("Should have a registration button", () => {
            chai.expect(signUp.getForm()).to.match(/<button.*>Register<\/button>/);
        });

        it("Should have a title", () => {
            chai.expect(signUp.getFormTitle()).to.equal("Sign Up");
        })
    });

    describe("Footer", () => {
        it("Should have a link to login page", () => {
            chai.expect(signUp.getFormFooter()).to.containIgnoreSpaces("login.html");
        });
    })
});

/**
 * Testing functionality for the landing page
 */
describe("Landing Page", () => {
    let landing;
    beforeEach(() => {
        landing = new Landing();
    });

    describe("Navigation Bar", () => {
        it("Should have a link to the login page", () => {
            chai.expect(landing.navBarMenu()).to.contains("login.html");
        });
    });

    describe("Body", () => {
        it("Should have a link to the registration page", () => {
            chai.expect(landing.content()).to.contains("register.html");
        });
    });
});
