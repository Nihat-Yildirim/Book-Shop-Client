<template>
    <HeaderComponent/>
    <div id="user-address-page-container">
        <div id="user-address-left-container">
            <UserAccountHeader :userAddressButtonSelect="true"/>
        </div>
        <div id="user-address-right-container">
            <div id="user-address-container">
                <div id="user-address-container-title">
                    <div>Adreslerim</div>
                    <div @click="addAddressButtonClick" v-if="getUserAddresses.length != 5 && getUserAddresses.length != 0 && getUserAddresses != null" id="user-address-title-add-button">Adres Ekle</div>
                </div>
                <div id="user-address-content-container">
                    <div v-if="getUserAddresses.length == 0" @click="addAddressButtonClick" id="user-address-add-button">+</div>
                    <div v-for="address in getUserAddresses" class="user-address-container" :key="address.id">
                        <div class="user-address-title">{{ address.addressTitle }}</div>
                        <div class="user-address-content">
                            <div class="user-address-province-district user-address-param">{{ changeAddressValueText(address.province.name) }} / {{ changeAddressValueText(address.district.name) }}</div>
                            <div class="user-address-neighbourhood user-address-param">{{ address.neighbourhood.name.toLowerCase() }}</div>
                            <div class="user-address-open-address user-address-param">{{ address.openAddress.toLowerCase() }}</div>
                            <div class="user-address-description user-address-param">{{ address.description.toLowerCase() }}</div>
                            <div class="user-address-phone-number user-address-param">{{ address.phoneNumber.substr(0,3)}}*****{{ address.phoneNumber.substr(8,2)}}</div>
                        </div>
                        <div class="user-address-buttons">
                            <i @click="deleteButtonClick(address)" class="bi bi-trash user-address-delete-button"></i>
                            <i @click="updateAddressButtonClick(address)" class="bi bi-pencil user-address-update-button"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="addUpdateAddressPopUpVisibility" id="add-update-address-popup">
        <div id="add-update-address-container">
            <div id="add-update-address-title">
                <div>{{ addUpdateAddressPopUpParams.titleName }}</div>
                <i @click="hideAddUpdateAddressPopPup" class="bi bi-x-lg"></i>
            </div>
            <div id="add-update-address-content">
                <div id="add-update-address-content-top">
                    <div class="address-input" id="address-title-input">
                        <div class="input-title">Başlık</div>
                        <input :class="addressTitleInputBorderClass" v-model="addressTitle" type="text">
                    </div>
                    <div class="address-input" id="address-phone-number-input">
                        <div class="input-title">Telefon Numarası</div>
                        <input :class="phoneNumberInputBorderClass" v-model="phoneNumber" type="number">
                    </div>
                    <div class="address-input" id="province-district-neighbourhood-input">
                        <div class="address-dropdown" id="address-province-input">
                            <div class="input-title">İl</div>
                            <div id="address-province-dropdown-input" @click="provinceDropDownInputClick = !provinceDropDownInputClick" :class="{'address-dropdown-input-click' : provinceDropDownInputClick}" class="address-dropdown-input">
                                <div>{{selectedProvince == null ? "Seçiniz" : changeAddressValueText(selectedProvince.name) }}</div>
                                <i class="bi bi-chevron-down"></i>
                            </div>
                            <div v-if="provinceDropDownInputClick" id="address-province-dropdown-values" class="address-dropdown-values">
                                <div class="dropdown-value" @click="provinceValueClick(province)" v-for="province in getAllProvince" :key="province.id">{{ changeAddressValueText(province.name) }}</div>
                            </div>
                        </div>
                        <div :class="{'not-parent-data-selected' : selectedProvince == null}" class="address-dropdown" id="address-district-input">
                            <div class="input-title">İlçe</div>
                            <div id="address-district-dropdown-input" @click="districtDropDownClick" :class="{'address-dropdown-input-click' : districtDropDownInputClick}" class="address-dropdown-input">
                                <div>{{selectedDistrict == null ? "Seçiniz" : changeAddressValueText(selectedDistrict.name) }}</div>
                                <i class="bi bi-chevron-down"></i>
                            </div>
                            <div v-if="districtDropDownInputClick" id="address-district-dropdown-values" class="address-dropdown-values">
                                <div class="dropdown-value" @click="districtValueClick(district)" v-for="district in getSelectedDistricts" :key="district.id">{{ changeAddressValueText(district.name) }}</div>
                            </div>
                        </div>
                        <div :class="{'not-parent-data-selected' : selectedDistrict == null}" class="address-dropdown" id="address-neighbourhood-input">
                            <div class="input-title">Mahalle</div>
                            <div id="address-neighbourhood-dropdown-input" @click="neighbourhoodDropDownClick" :class="{'address-dropdown-input-click' : neighbourhoodDropDownInputClick}" class="address-dropdown-input">
                                <div>{{selectedNeighbourhood == null ? "Seçiniz" : changeAddressValueText(selectedNeighbourhood.name) }}</div>
                                <i class="bi bi-chevron-down"></i>
                            </div>
                            <div v-if="neighbourhoodDropDownInputClick" id="address-neighbourhood-dropdown-values" class="address-dropdown-values">
                                <div class="dropdown-value" @click="selectedNeighbourhood = neighbourhood" v-for="neighbourhood in getSelectedNeighbourhoods" :key="neighbourhood.id">{{ changeAddressValueText(neighbourhood.name) }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="address-input" id="address-open-address-input">
                        <div class="input-title">Adres</div>
                        <textarea :class="openAddressInputBorderClass" v-model="openAddress"></textarea>
                    </div>
                    <div class="address-input" id="address-description-input">
                        <div class="input-title">Adres Açıklama</div>
                        <textarea :class="addressDescriptionInputBorderClass" v-model="addressDescription"></textarea>
                    </div>
                </div>
                <div id="add-update-address-content-bottom">
                    <button :class="{'address-update-button' : addUpdateAddressPopUpParams.isAddressAdd == false}" @click="addUpdateAddressButtonAction" class="address-add-button">{{ addUpdateAddressPopUpParams.buttonName }}</button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="deleteAddressPopPupVisibility" id="delete-address-popup">
        <div id="delete-address-container">
            <div id="delete-address-container-top">
                <i @click="hideDeleteAddressPopUp" class="bi bi-x-lg"></i>
            </div>
            <div id="delete-address-container-bottom">
                <div>Silmek İstediğinize Eminmisiniz ?</div>
                <button @click="deleteAddress">Sil</button>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/pages/user/components/HeaderComponent';
import UserAccountHeader from '@/pages/user/account_pages/components/UserAccountHeader';
import { mapGetters,mapActions } from 'vuex';

export default{
    data(){
        return{
            addUpdateAddressPopUpVisibility : false,
            deleteAddressPopPupVisibility : false,
            provinceDropDownInputClick : false,
            districtDropDownInputClick : false,
            neighbourhoodDropDownInputClick : false,
            addButtonClicked : false,
            deleteButtonClicked : false,
            updateButtonClicked : false,
            addUpdateAddressPopUpParams : null,
            selectedAddress : null,
            selectedProvince : null,
            selectedDistrict : null,
            selectedNeighbourhood : null,
            addressDescription :"",
            addressTitle : "",
            openAddress : "",
            phoneNumber: "",
            phoneNumberInputBorderClass : "",
            addressDescriptionInputBorderClass : "",
            addressTitleInputBorderClass  : "",
            openAddressInputBorderClass : "",
            deletedAddressId : null,
            updatedAddress : null,
        }
    },
    computed:{
        ...mapGetters({
            getUserId : "AuthModule/_getUserId",
            getAllProvince : "ProvinceModule/_getProvinces",
            getUserAddresses : "AddressModule/_getUserAddresses",
            getSelectedDistricts : "DistrictModule/_getSelectedDistricts",
            getAddAddressSuccessResult : "AddressModule/_getAddAddressSuccessResult",
            getSelectedNeighbourhoods : "NeighbourhoodModule/_getSelectedNeighbourhoods",
            getDeleteAddressSuccessResult : "AddressModule/_getDeleteAddressSuccessResult",
            getUpdateAddressSuccessResult : "AddressModule/_getUpdateAddressSuccessResult",
        }),
    },
    methods:{
        ...mapActions({
            getAllProvinceAction : "ProvinceModule/getAllProvince",
            getDistrictsByProvinceIdAction : "DistrictModule/getDistrictByProvinceId",
            getSelectedNeighbourhoodsByDistrictIdAction : "NeighbourhoodModule/getNeighbourhoodByDistrictId",
            addAddressAction : "AddressModule/addAddress",
            getUserAddressesAction : "AddressModule/getUserAddresses",
            deleteAddressAction : "AddressModule/deleteAddress",
            updateAddressAction : "AddressModule/updateAddress",
        }),
        districtDropDownClick(){
            if(this.selectedProvince)
                this.districtDropDownInputClick = !this.districtDropDownInputClick;
        },
        neighbourhoodDropDownClick(){
            if(this.selectedDistrict)
                this.neighbourhoodDropDownInputClick = !this.neighbourhoodDropDownInputClick;
        },
        provinceValueClick(province){
            this.selectedProvince = province;
            this.selectedNeighbourhood = null;
            this.selectedDistrict = null;
            this.getDistrictsByProvinceIdAction(province.id);
        },
        districtValueClick(district){
            this.selectedDistrict = district;
            this.selectedNeighbourhood = null;
            this.getSelectedNeighbourhoodsByDistrictIdAction(district.id);
        },
        changeAddressValueText(text){
            let newText = "";
            for(let index = 0;index < text.length ;index++){
                if(index != 0)
                    if(text[index] == "I")
                        newText += "ı"
                    else
                        newText += text[index].toLowerCase();
                else
                    newText += text[index];
            }
            return newText;
        },
        addAddressButtonClick(){
            this.addUpdateAddressPopUpVisibility = true;
            this.addUpdateAddressPopUpParams = {
                buttonName : "Ekle",
                titleName : "Adres Ekle",
                isAddressAdd : true
            }
        },
        updateAddressButtonClick(selectedAddress){
            this.addUpdateAddressPopUpVisibility = true;
            this.addUpdateAddressPopUpParams = {
                buttonName : "Güncelle",
                titleName : "Adres Güncelle",
                isAddressAdd : false,
            }
            this.updatedAddress = selectedAddress;
            if(selectedAddress){
                this.selectedAddress = selectedAddress;
                this.phoneNumber = selectedAddress.phoneNumber;
                this.addressTitle = selectedAddress.addressTitle;
                this.openAddress = selectedAddress.openAddress;
                this.addressDescription = selectedAddress.description;
                this.selectedProvince = selectedAddress.province;
                this.selectedDistrict = selectedAddress.district;
                this.selectedNeighbourhood = selectedAddress.neighbourhood;
                this.getDistrictsByProvinceIdAction(selectedAddress.province.id);
                this.getSelectedNeighbourhoodsByDistrictIdAction(selectedAddress.district.id);
            }
        },
        hideProvinceDropDown(){
            document.querySelector("#app").addEventListener("click",(e)=>{
                if(e.srcElement.id == "address-province-dropdown-input")
                    return;

                if(e.srcElement.parentElement != null && e.srcElement.parentElement.id == "address-province-dropdown-input")
                    return;

                if(e.srcElement.id == "address-province-dropdown-values")    
                    return;

                if(e.srcElement.parentElement == "address-province-dropdown-values")
                    return;
                
                this.provinceDropDownInputClick = false;
            })
        },
        hideDistrictDropDown(){
            document.querySelector("#app").addEventListener("click",(e)=>{
                if(e.srcElement.id == "address-district-dropdown-input")
                    return;

                if(e.srcElement.parentElement != null && e.srcElement.parentElement.id == "address-district-dropdown-input")
                    return;

                if(e.srcElement.id == "address-district-dropdown-values")    
                    return;

                if(e.srcElement.parentElement == "address-district-dropdown-values")
                    return;
                
                this.districtDropDownInputClick = false;     
            })
        },
        hideNeighbourhoodDropDown(){
            document.querySelector("#app").addEventListener("click",(e)=>{
                if(e.srcElement.id == "address-neighbourhood-dropdown-input")
                    return;

                if(e.srcElement.parentElement != null && e.srcElement.parentElement.id == "address-neighbourhood-dropdown-input")
                    return;

                if(e.srcElement.id == "address-neighbourhood-dropdown-values")    
                    return;

                if(e.srcElement.parentElement == "address-neighbourhood-dropdown-values")
                    return;
                
                this.neighbourhoodDropDownInputClick = false;    
            })
        },
        hideAddUpdateAddressPopPup(){
            this.addUpdateAddressPopUpVisibility = false;
            this.selectedProvince = null;
            this.selectedDistrict = null;
            this.selectedNeighbourhood = null;
            this.addressDescription = "";
            this.openAddress = "";
            this.addressTitle = "";
            this.addUpdateAddressPopUpParams = null;
            this.selectedAddress = null;
        },
        addressDescriptionValidator(){
            if(this.addressDescription == "" || this.addressDescription == null){
                this.addressDescriptionInputBorderClass = "address-input-error-border";
                return false;
            }

            if(this.addressDescription.length > 125 || this.addressDescription.length < 3){
                this.addressDescriptionInputBorderClass = "address-input-error-border";
                return false;
            }

            return true;
        },
        openAddressValidator(){
            if(this.openAddress == "" || this.openAddress == null){
                this.openAddressInputBorderClass = "address-input-error-border";
                return false;    
            }

            if(this.openAddress.length > 250 || this.openAddress.length < 30){
                this.openAddressInputBorderClass = "address-input-error-border";
                return false;
            }

            return true;
        },
        addressTitleValidator(){
            if(this.addressTitle == "" || this.addressTitle == null){
                this.addressTitleInputBorderClass = "address-input-error-border";
                return false;
            }

            if(this.addressTitle.length > 25){
                this.addressTitleInputBorderClass = "address-input-error-border";
                return false;
            }

            return true;    
        },
        phoneNumberValidator(){
            if(this.phoneNumber == "" || this.phoneNumber == null){
                this.phoneNumberInputBorderClass = "address-input-error-border";
                return false;
            }

            if(!this.phoneNumber.match(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/)){
                this.phoneNumberInputBorderClass = "address-input-error-border";
                return false;
            }

            return true;
        },
        addAddress(){
            if(!this.addUpdateAddressPopUpParams.isAddressAdd)
                return;

            const isValidAddressTitle = this.addressTitleValidator();
            const isValidAddressDescription = this.addressDescriptionValidator();
            const isValidOpenAddress = this.openAddressValidator();
            const isValidPhoneNumber = this.phoneNumberValidator();

            if(!isValidOpenAddress || !isValidAddressTitle || !isValidAddressDescription || !isValidPhoneNumber)
                return;

            if(this.selectedProvince == null || this.selectedDistrict == null || this.selectedNeighbourhood == null)
                return;

            if(this.selectedProvince.id != this.selectedDistrict.provinceId || this.selectedDistrict.id != this.selectedNeighbourhood.districtId)
                return;

            if(this.getUserId == null)
                return;

            if(!this.addButtonClicked){
                this.addAddressAction({
                    userId : this.getUserId,
                    provinceId : this.selectedProvince.id,
                    districtId : this.selectedDistrict.id,
                    neighbourhoodId : this.selectedNeighbourhood.id,
                    openAddress : this.openAddress,
                    addressTitle : this.addressTitle,
                    description : this.addressDescription,
                    phoneNumber: this.phoneNumber
                });

                this.addButtonClicked = true;
            }
        },
        deleteAddress(){
            if(this.getUserId == null)
                return;

            if(this.deletedAddressId == null)
                return;

            if(!this.deleteButtonClicked){
                this.deleteAddressAction({
                    userId : this.getUserId,
                    addressId : this.deletedAddressId
                });

                this.deleteButtonClicked = true;
            }
        },
        updateAddress(){
            if(this.addUpdateAddressPopUpParams.isAddressAdd)
                return;

            const isValidAddressTitle = this.addressTitleValidator();
            const isValidAddressDescription = this.addressDescriptionValidator();
            const isValidOpenAddress = this.openAddressValidator();
            const isValidPhoneNumber = this.phoneNumberValidator();

            if(!isValidOpenAddress || !isValidAddressTitle || !isValidAddressDescription || !isValidPhoneNumber)
                return;

            if(this.selectedProvince == null || this.selectedDistrict == null || this.selectedNeighbourhood == null)
                return;

            if(this.selectedProvince.id != this.selectedDistrict.provinceId || this.selectedDistrict.id != this.selectedNeighbourhood.districtId)
                return;

            if(this.getUserId == null)
                return;
            
            if(!this.updateButtonClicked){
                this.updateAddressAction({
                    userId : this.getUserId,
                    phoneNumber : this.phoneNumber,
                    addressId : this.selectedAddress.id,
                    provinceId : this.selectedProvince.id,
                    districtId : this.selectedDistrict.id,
                    neighbourhoodId : this.selectedNeighbourhood.id,
                    addressTitle : this.addressTitle,
                    description : this.addressDescription,
                    openAddress :  this.openAddress,
                    selected : this.selectedAddress.selected, 
                });

                this.updateButtonClicked = true;
            }
        },
        deleteButtonClick(address){
            this.deletedAddressId = address.id;
            this.deleteAddressPopPupVisibility = true;
        },
        hideDeleteAddressPopUp(){
            this.deletedAddressId = null;
            this.deleteAddressPopPupVisibility = false;
        },
        addUpdateAddressButtonAction(){
            if(this.addUpdateAddressPopUpParams.isAddressAdd)
                this.addAddress()
            else
                this.updateAddress();
        }
    },
    watch:{
        addressTitle(){
            if(this.addressTitle != null && this.addressTitle != "" && this.addressTitle.length <= 25)
                this.addressTitleInputBorderClass = "";

            if(this.addressTitle.length > 25)
                this.addressTitleInputBorderClass = "address-input-error-border";
        },
        openAddress(){
            if(this.openAddress != null && this.openAddress != "" && this.openAddress.length <= 250)
                this.openAddressInputBorderClass = "";

            if(this.openAddress.length > 250)
                this.openAddressInputBorderClass = "address-input-error-border";
        },
        addressDescription(){
            if(this.addressDescription != null && this.addressDescription != "" && this.addressDescription.length <= 125)
                this.addressDescriptionInputBorderClass = "";

            if(this.addressDescription.length >125)
                this.addressDescriptionInputBorderClass = "address-input-error-border";
        },
        phoneNumber(){
            this.phoneNumber = this.phoneNumber.toString();
            if(this.phoneNumber != null && this.phoneNumber != "" && this.phoneNumber.length <=10)
                this.phoneNumberInputBorderClass = "";

            if(this.phoneNumber.length >10 && !this.phoneNumber.match(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/))
                this.phoneNumberInputBorderClass = "address-input-error-border";
        },
        getAddAddressSuccessResult(){
            if(this.getAddAddressSuccessResult){
                this.addButtonClicked = false;
                this.hideAddUpdateAddressPopPup();
                this.getUserAddressesAction(this.getUserId);
            }
        },
        getDeleteAddressSuccessResult(){
            if(this.getDeleteAddressSuccessResult){
                this.deleteButtonClicked = false;
                this.hideDeleteAddressPopUp();
                this.getUserAddressesAction(this.getUserId);
            }
        },
        getUpdateAddressSuccessResult(){
            if(this.getUpdateAddressSuccessResult){
                this.updateButtonClicked = false;
                this.hideAddUpdateAddressPopPup();
                this.getUserAddressesAction(this.getUserId);
            }
        }
    },
    components:{
        HeaderComponent,
        UserAccountHeader,
    },
    mounted(){
        this.getAllProvinceAction();
        this.getUserAddressesAction(this.getUserId);
    },
    updated(){
        this.hideProvinceDropDown();
        this.hideDistrictDropDown();
        this.hideNeighbourhoodDropDown();
    }
}
</script>

<style>
    #user-address-page-container{
        width: 100%;
        min-width: 1510px;
        padding: 50px 9% 0 9%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 50px;
        height: auto;
    }

    #user-address-left-container{
        width: 23%;
        margin-right: 20px;
    }

    #user-address-right-container{
        width: 76%;
    }

    #user-address-container{
        display: flex;
        flex-direction: column;
        padding: 10px;
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 5px;
        height: auto;
    }

    #user-address-container-title{
        display: flex;
        justify-content: space-between;
        padding-left: 2px;
        margin-bottom: 15px;
        height: 30px;
        font-size: 18px;
        color: orange;
        border-bottom: 2px solid #D5DBDB;
    }

    #user-address-title-add-button{
        cursor: pointer;
        font-size: 14px;
        width: 90px;
        color: #fff;
        background-color: #229954;
        text-align: center;
        border-radius: 4px;
        padding-top: 2px;
        height: 25px;
        border: 1.5px solid #196F3D;
        transition: 250ms all;
    }

    #user-address-title-add-button:hover{
        opacity: 0.9;
        transition: 250ms all;
    }

    #user-address-content-container{
        padding-left: 15px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    #user-address-add-button{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 150px;
        border: 2px solid #D5DBDB;
        user-select: none;
        border-radius: 10px;
        font-size: 40px;
        font-weight: 200;
        transition: all 500ms;
        cursor: pointer;
        color: #95A5A6;
    }

    #user-address-add-button:hover{
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        color: orange;
        transition: all 500ms;
    }

    /* User Address Container Start */
    .user-address-container{
        display: flex;
        flex-direction: column;
        width: 290px;
        height: 255px;
        border-radius: 5px;
        background-color: #FBFCFC;
        border: 2px solid #D5DBDB;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .user-address-title{
        height: 35px;
        border-top-right-radius: 3px;
        border-top-left-radius: 3px;
        border-bottom: 1.5px solid #D5DBDB;
        background-color: #E5E7E9;
        padding-left: 10px;
        font-size: 18px;
        display: flex;
        align-items: center;
    }

    .user-address-content{
        overflow-y: auto;
        height: 190px;
        padding: 10px;
    }

    .user-address-param{
        font-size: 15px;
        margin-bottom: 3px;
    }

    .user-address-buttons{
        padding-top: 1px;
        padding-left: 5px;
        display: flex;
        align-items: center;
        width: 100%;
        height: 25px;
        border-top: 2px solid #D5DBDB;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
    }

    .user-address-update-button,
    .user-address-delete-button{
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        height: 22px;
        width: 22px;
        cursor: pointer;
        color: #fff;
        transition: 150ms all;
    }

    .user-address-delete-button{
        padding-top: 2px;
        margin-right: 7px;
        background-color: red;
        border: 1.4px solid #CB4335;
    }

    .user-address-update-button{
        background-color: orange;
        border: 1.4px solid #E67E22;
    }
    
    .user-address-update-button:hover,
    .user-address-delete-button:hover{
        opacity: 0.7;
        transition: 150ms all;
    }

    /* User Address Container End */

    /* Add-Update Adress PopUp Start*/
    #add-update-address-popup{
        top: 0;
        position: absolute;
        width: 1519px;
        height: 100%;
        min-height: 840px;
        background-color: rgba(213, 213, 213, 0.3);
        padding-top: 95px;
        display: flex;
        justify-content: center;
        z-index: 250;
    }

    #add-update-address-container{
        padding: 10px;
        width: 750px;
        height: 565px;
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 5px;
    }

    #add-update-address-title{
        display: flex;
        justify-content: space-between;
        border-bottom: 1.6px solid #D5DBDB;
        height: 30px;
        margin-bottom: 10px;
    }

    #add-update-address-title div{
        font-size: 19px;
        color: orange;
    }

    #add-update-address-title i{
        font-size: 18px;
        color: grey;
        cursor: pointer;
    }

    #add-update-address-content-top{
        display: flex;
        flex-direction: column;
    }

    #province-district-neighbourhood-input{
        display: flex;
    }

    #address-title-input{
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }

    #address-phone-number-input{
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }

    #address-phone-number-input input::-webkit-outer-spin-button,
    #address-phone-number-input input::-webkit-inner-spin-button{
        -webkit-appearance: none;
    }

    .input-title{
        color: orange;
        font-size: 17px;
        margin-left: 1px;
    }

    .address-input{
        margin-bottom: 15px;
    }

    .address-input input{
        font-size: 15px;
        outline: none;
        height: 35px;
        padding-left: 5px;
        border-radius: 3px;
        background-color: #FFF;
        color: #273746;
        border: none;
        border: 1.5px solid #D5DBDB;
    }

    #address-district-input,
    #address-province-input{
        margin-right: 15px;
    }

    .address-dropdown{
        position: relative;
    }

    .address-dropdown-input-click{
        border: 1.5px solid orange !important;
        border-radius: 3px 3px 0px 0px !important;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        transition: all 250ms;
    }

    .address-dropdown-input{
        user-select: none;
        padding-left: 5px;
        padding-right: 5px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 35px;
        width: 215px;
        border: 1.5px solid #D5DBDB;
        background-color:  #fff;
        border-radius: 3px;
        color: #273746;
        font-size: 15px;
        transition: all 250ms;
    }

    #address-neighbourhood-dropdown-values,
    #address-neighbourhood-dropdown-input{
        width: 265px !important;
    }

    #address-neighbourhood-dropdown-input div{
        font-size: 13px;
    }

    #address-neighbourhood-dropdown-values div{
        font-size: 13px !important;
    }

    .address-dropdown-values{
        padding-bottom: 4px;
        top: 56px;
        position: absolute;
        max-height: 251px;
        overflow: auto;
        width: 215px;
        background-color: #fff;
        border : 1.5px solid orange;
        border-radius: 0px 0px 3px 3px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    .dropdown-value{
        padding-left: 2px;
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 25px;
        font-size: 14px;
        user-select: none;
        transition: all 250ms;
    }

    .dropdown-value:hover{
        background-color: #F8C471;
        color: #fff;
        transition: all 250ms;
    }

    .not-parent-data-selected{
        opacity: 0.5;
    }

    .address-input textarea{
        border: 1.5px solid #D5DBDB;
        color: #17202A;
        font-size: 15px;
        padding: 7px;
        background-color: #fff;
        outline: none;
        border-radius: 4px;
        width: 100%;
        height: 75px;
        resize: none;
    }

    #add-update-address-content-bottom{
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #add-update-address-content-bottom button{
        width: 100%;
        height: 40px;
        border-radius: 5px;
        border: 1.5px solid #D5DBDB;
        outline: none;
        cursor: pointer;
        font-size: 18px;
        color: #fff;
        transition: 250ms all;
    }

    #add-update-address-content-bottom button:hover{
        opacity: 0.9;
        transition: 250ms all;
    }

    .address-add-button{
        background-color:#239B56;
        border: 2px solid  #1E8449 !important;
    }

    .address-update-button{
        background-color: orange;
        border: 2px solid #D68910 !important;
    }

    .address-input-error-border{
        border: 1.5px solid red !important;
    }
    /* Add-Update Adress PopUp End*/

    /* Delete Address PopUp Start */
    #delete-address-popup{
        top: 0;
        position: absolute;
        width: 1519px;
        min-height: 840px;
        height: 100%;
        background-color: rgba(213, 213, 213, 0.3);
        display: flex;
        justify-content: center;
        padding-top: 230px;
        z-index: 250;
    }

    #delete-address-container{
        background-color: #f8f9f9;
        border: 2px solid #D5DBDB;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 5px;
        width: 500px;
        height: 230px;
        padding: 10px;
    }

    #delete-address-container-top{
        display: flex;
        justify-content: right;
        margin-bottom: 30px;
    }

    #delete-address-container-top i{
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        color: grey;
    }

    #delete-address-container-bottom{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #delete-address-container-bottom div{
        font-size: 20px;
        margin-bottom: 50px;
    }

    #delete-address-container-bottom button{
        width: 125px;
        height: 30px;
        cursor: pointer;
        border-radius: 5px;
        background-color: #E74C3C;
        color: #fff;
        border: 1.6px solid #C0392B;
        transition: all 250ms;
    }

    #delete-address-container-bottom button:hover{
        opacity: 0.8;
        transition: all 250ms;
    }
    /* Delete Address PopUp End */
</style>