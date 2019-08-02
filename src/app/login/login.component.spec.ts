import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { element, by, browser } from 'protractor';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let homeURL = 'http://ec2-18-221-142-60.us-east-2.compute.amazonaws.com:8080/project2-frontend/';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Should enter values', () => {
    browser.get(homeURL);
    element(by.id('sbmtBtn')).click();
    element(by.id('genAlert')).toBe('Must provide email.');
  });

  it('Should enter login values', () => {
    browser.get(homeURL);
    element(by.id('emailL')).sendKeys('test@test.test');
    element(by.id('logBtn')).click();
    element(by.id('genAlert')).toBe('Must enter a password.');
  });


  it('Should enter all login values', () => {
    browser.get(homeURL);
    element(by.id('emailL')).sendKeys('test@test.test');
    element(by.id('passwordL')).sendKeys('password');
    element(by.id('logBtn')).click();
    if (element(by.tagName('h1')).getText() !== null) {
      element(by.tagName('h1')).toBe('Welcome to PrettyPenny');
    }
    else {
      element(by.id('genAlert')).toBe('Invalid Credentials.');
    }
  });
});
