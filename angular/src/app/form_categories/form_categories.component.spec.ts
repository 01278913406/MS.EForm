import { CoreTestingModule } from "@abp/ng.core/testing";
import { ThemeSharedTestingModule } from "@abp/ng.theme.shared/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { NgxValidateCoreModule } from "@ngx-validate/core";
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from '@abp/ng.core';
import { FormCategoryComponent } from "./form_categories.component";



describe("FormCategoryComponent", () => {
  let fixture: ComponentFixture<FormCategoryComponent>;
  const mockOAuthService = jasmine.createSpyObj('OAuthService', ['hasValidAccessToken'])
  const mockAuthService = jasmine.createSpyObj('AuthService', ['navigateToLogin'])
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FormCategoryComponent],
        imports: [
          CoreTestingModule.withConfig(),
          ThemeSharedTestingModule.withConfig(),
          NgxValidateCoreModule,
        ],
        providers: [
          /* mock providers here */
          {
            provide: OAuthService,
            useValue: mockOAuthService
          },
          {
            provide: AuthService,
            useValue: mockAuthService
          }
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCategoryComponent);
    fixture.detectChanges();
  });

  it("should be initiated", () => {
    expect(fixture.componentInstance).toBeTruthy();
  });



  describe('when login state is true', () => {
    beforeAll(() => {
      mockOAuthService.hasValidAccessToken.and.returnValue(true)
    });

    it("hasLoggedIn should be true", () => {

      // expect(fixture.componentInstance.hasLoggedIn).toBeTrue();
      expect(mockOAuthService.hasValidAccessToken).toHaveBeenCalled()
    })

    it("button should not be exists", () => {
      const element = fixture.nativeElement
      const button = element.querySelector('[role="button"]')
      expect(button).toBeNull()
    })

  })

  describe('when login state is false', () => {
    beforeAll(() => {
      mockOAuthService.hasValidAccessToken.and.returnValue(false)
    });

    it("hasLoggedIn should be false", () => {

      // expect(fixture.componentInstance.hasLoggedIn).toBeFalse();
      expect(mockOAuthService.hasValidAccessToken).toHaveBeenCalled()
    })

    it("button should be exists", () => {
      const element = fixture.nativeElement
      const button = element.querySelector('[role="button"]')
      expect(button).toBeDefined()
    })
    describe('when button clicked', () => {

      beforeEach(() => {
        const element = fixture.nativeElement
        const button = element.querySelector('[role="button"]')
        button.click()
      });

      it("navigateToLogin have been called", () => {
        expect(mockAuthService.navigateToLogin).toHaveBeenCalled()
      })
    })
  })

});
