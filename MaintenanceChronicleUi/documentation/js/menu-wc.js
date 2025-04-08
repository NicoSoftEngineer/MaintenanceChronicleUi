'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">maintenance-chronicle-ui documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AlertComponent.html" data-type="entity-link" >AlertComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ChooseAccountComponent.html" data-type="entity-link" >ChooseAccountComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CreatePasswordPageComponent.html" data-type="entity-link" >CreatePasswordPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CustomerDetailPageComponent.html" data-type="entity-link" >CustomerDetailPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CustomerListPageComponent.html" data-type="entity-link" >CustomerListPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DatePickerComponent.html" data-type="entity-link" >DatePickerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DefaultComponent.html" data-type="entity-link" >DefaultComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmailConfirmPageComponent.html" data-type="entity-link" >EmailConfirmPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ForbiddenPageComponent.html" data-type="entity-link" >ForbiddenPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ForgotPasswordPageComponent.html" data-type="entity-link" >ForgotPasswordPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FormInputComponent.html" data-type="entity-link" >FormInputComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LocationDetailComponent.html" data-type="entity-link" >LocationDetailComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LocationListPageComponent.html" data-type="entity-link" >LocationListPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginPageComponent.html" data-type="entity-link" >LoginPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MachineDetailPageComponent.html" data-type="entity-link" >MachineDetailPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MachineDetailUnauthorizedPageComponent.html" data-type="entity-link" >MachineDetailUnauthorizedPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MachineListPageComponent.html" data-type="entity-link" >MachineListPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MultiSelect.html" data-type="entity-link" >MultiSelect</a>
                            </li>
                            <li class="link">
                                <a href="components/OffCanvasComponent.html" data-type="entity-link" >OffCanvasComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PopUpModalComponent.html" data-type="entity-link" >PopUpModalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/QrCodeComponent.html" data-type="entity-link" >QrCodeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RecordDetailPageComponent.html" data-type="entity-link" >RecordDetailPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RecordListPageComponent.html" data-type="entity-link" >RecordListPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RegisterPageComponent.html" data-type="entity-link" >RegisterPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ResetPasswordPageComponent.html" data-type="entity-link" >ResetPasswordPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SearchSelectComponent.html" data-type="entity-link" >SearchSelectComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ServerErrorPageComponent.html" data-type="entity-link" >ServerErrorPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UnauthorizedHomePageComponent.html" data-type="entity-link" >UnauthorizedHomePageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UnauthorizedPageComponent.html" data-type="entity-link" >UnauthorizedPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserDetailPageComponent.html" data-type="entity-link" >UserDetailPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserListPageComponent.html" data-type="entity-link" >UserListPageComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminRoleGuard.html" data-type="entity-link" >AdminRoleGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AlertStateService.html" data-type="entity-link" >AlertStateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CookieHelperService.html" data-type="entity-link" >CookieHelperService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomerService.html" data-type="entity-link" >CustomerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocationService.html" data-type="entity-link" >LocationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MachineService.html" data-type="entity-link" >MachineService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PopUpStateService.html" data-type="entity-link" >PopUpStateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecordService.html" data-type="entity-link" >RecordService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReminderService.html" data-type="entity-link" >ReminderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TenantService.html" data-type="entity-link" >TenantService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenHelperService.html" data-type="entity-link" >TokenHelperService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CreateRecordDetailDto.html" data-type="entity-link" >CreateRecordDetailDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateReminderDto.html" data-type="entity-link" >CreateReminderDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomerDetail.html" data-type="entity-link" >CustomerDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomerDetailForLocation.html" data-type="entity-link" >CustomerDetailForLocation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomerFilterDto.html" data-type="entity-link" >CustomerFilterDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomerInFilter.html" data-type="entity-link" >CustomerInFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomerListDto.html" data-type="entity-link" >CustomerListDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmailConfirmTokenForUserDto.html" data-type="entity-link" >EmailConfirmTokenForUserDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocationDetailDto.html" data-type="entity-link" >LocationDetailDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocationFilter.html" data-type="entity-link" >LocationFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LocationListDto.html" data-type="entity-link" >LocationListDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoggedInUserInfoDto.html" data-type="entity-link" >LoggedInUserInfoDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MachineDetailDto.html" data-type="entity-link" >MachineDetailDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MachineFilter.html" data-type="entity-link" >MachineFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MachineInFilterDto.html" data-type="entity-link" >MachineInFilterDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MachineListDto.html" data-type="entity-link" >MachineListDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MachineRecordInListDto.html" data-type="entity-link" >MachineRecordInListDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewCustomerDetail.html" data-type="entity-link" >NewCustomerDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewLocationDetailDto.html" data-type="entity-link" >NewLocationDetailDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewMachineDetailDto.html" data-type="entity-link" >NewMachineDetailDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecordDetailDto.html" data-type="entity-link" >RecordDetailDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecordFilter.html" data-type="entity-link" >RecordFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecordListDto.html" data-type="entity-link" >RecordListDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecordTypeDto.html" data-type="entity-link" >RecordTypeDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegisterUserTenantDto.html" data-type="entity-link" >RegisterUserTenantDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReminderDto.html" data-type="entity-link" >ReminderDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RoleDetail.html" data-type="entity-link" >RoleDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserContactList.html" data-type="entity-link" >UserContactList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserDetail.html" data-type="entity-link" >UserDetail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserFilter.html" data-type="entity-link" >UserFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserListDto.html" data-type="entity-link" >UserListDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserPasswordDto.html" data-type="entity-link" >UserPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserTokenList.html" data-type="entity-link" >UserTokenList</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});