
const pqOptions = {
    width: "auto",
    height: 250,
    showTitle: false,
    showHeader: true,
    showTop: true,
    showToolbar: false,
    showBottom: true,
    wrap: true,
    hwrap: false,
    sortable: false,
    editable: false,
    resizable: false,
    collapsible: false,
    draggable: true, dragColumns: { enabled: true },
    scrollModel: { autoFit: true },
    numberCell: { show: true, resizable: true, title: "S.N.", minWidth: 30 },
    pageModel: { curPage: 1, rPP: 10, type: "local" },
    columnTemplate: { wrap: true, editable: false, dataType: "string", halign: "center", hvalign: "center", resizable: true, styleHead: { 'font-weight': "bold" } },
};

function IndexVM() {
    const self = this;

    var isNullOrEmpty = function (str) {
        if (str === undefined || str === null) {
            return true;
        } else if (typeof str === "string") {
            return (str.trim() === "");
        } else {
            return false;
        }
            };
        
         

    const models = {
        MyModel: function (item) {
            item = item || {};
            this.Name = ko.observable(item.Name || "");
            this.Age = ko.observable(item.Age || "");
            this.Email = ko.observable(item.Email || "");
            this.Phone = ko.observable(item.Phone || "");
            this.Email = ko.observable(item.Email || "");
            this.SelectedGender = ko.observable();
            this.edu = ko.observableArray([]); 
            this.SalutationId = ko.observable(item.SalutationId || "");
            this.SalutationName = ko.observable(item.SalutationName || "");
           
        },
        MyAddress: function (item) {
            item = item || {};
            this.District = ko.observable(item.TemDis || "");
            this.Ward = ko.observable(item.Temward || "");
            this.Zone = ko.observable(item.Temzone || "");
            this.Tole = ko.observable(item.Temtol || "");
            this.ProvId = ko.observable(item.ProvId || "");
            this.Province = ko.observable(item.Province || "");
            this.AddressId = ko.observable(item.AddressId || "");
            this.AddressName = ko.observable(item.AddressName || "");

        },

        UiElements: function () {
            self.HdnId = ko.observable('');
            self.MyModel = ko.observable(new models.MyModel());
            self.MyAddress = ko.observable(new models.MyAddress());
            self.enableDisableGender = ko.observable(false);
            self.DataList = ko.observableArray([]);
            self.onChangeOfSalutation = function () {
                if (self.MyModel().SalutationId() == "0") {
                    self.MyModel().SelectedGender("Male");
                    self.enableDisableGender(false);
                }
                else if (self.MyModel().SalutationId() == "1" || self.MyModel().SalutationId() == "2") {
                    self.MyModel().SelectedGender("Female");
                    self.enableDisableGender(false);
                }
                else {
                    self.enableDisableGender(true);
                    return;
                }
            };
            self.SalutationList = ko.observableArray([
                { Text: 'Mr.', Value: '0' },
                { Text: 'Ms.', Value: '1' },
                { Text: 'Mrs.', Value: '2' },
            ]);
            self.AddressList = ko.observableArray([
                { Text: 'Temporary', Value: '0' },
                { Text: 'Permanent', Value: '1' },
               
            ]);

            self.ProvinceList = ko.observableArray([
                { Text: 'Province-1', Value: '0' },
                { Text: 'Province-2', Value: '1' },
                { Text: 'Province-3', Value: '2' },
                { Text: 'Province-4', Value: '3' },
                { Text: 'Province-5', Value: '4' },
                { Text: 'Province-6', Value: '5' },
                { Text: 'Province-7', Value: '6' },
            ]);
            self.SalutationList = ko.observableArray([
                { Text: 'Mr.', Value: '0' },
                { Text: 'Ms.', Value: '1' },
                { Text: 'Mrs.', Value: '2' },
            ]);
            self.enableDisable = ko.observable(false);
            self.enablesub = ko.observable(false);
            self.enableadd = ko.observable(true);
            self.enableclear = ko.observable(false);
            self.canupdate = ko.observable(false);

        },
    };

    self.Add = function () {

        self.enableDisable(true);
        self.enablesub(true);
        self.enableclear(true);
        self.enableadd(false);

    };

    self.Submit = function () {

        if (UiEvents.validate.SaveValidation()) {
            UiEvents.functions.Save("demoGrid");
            UiEvents.clear.FieldClear();
            self.enablesub(false);
            self.enableclear(false);
            self.enableadd(true);
            self.enableDisable(false);
            

        }
    };

    
    self.UpdateInformation = function () {
        
        
            if (isNullOrEmpty(self.HdnId())) {
                alert('error');
            }
            else {
                self.MyAddress().AddressName((self.AddressList().find(X => X.Value == self.MyAddress().AddressId()) || {}).Text);
                self.MyAddress().Province((self.ProvinceList().find(X => X.Value == self.MyAddress().ProvId()) || {}).Text);
                let list = ko.toJS(self.DataList());
                list[self.HdnId()].AddressName = self.MyAddress().AddressName();
                list[self.HdnId()].District = self.MyAddress().District();
                list[self.HdnId()].Ward = self.MyAddress().Ward();
                list[self.HdnId()].Tole = self.MyAddress().Tole();
                list[self.HdnId()].Zone = self.MyAddress().Zone();
                list[self.HdnId()].Province = self.MyAddress().Province();
              
                if (UiEvents.validate.UpdateValidation()) {
                    self.DataList([]);
                    self.DataList(list);
                   
                    UiEvents.functions.Save("demoGrid");
                    UiEvents.clear.FieldClear();
                    self.canupdate(false);
                    self.enableDisable(false);
                    self.HdnId('');
                }
            }
        
    };

     self.ClearInformation = function () {
            UiEvents.clear.FieldClear();
    };

    self.Clear = function () {
        self.MyModel(new models.MyModel());
        self.MyAddress(new models.MyAddress());
        self.enableDisable(false);
        self.enablesub(false);
        self.enableadd(true);
        self.enableclear(false);
        $("#tabs").tabs();
    
    };



   self.delete = function deleteRow(index) {
        
        if(confirm("Are you sure you want to delete this data?"))
        {
             self.DataList.splice(index, 1);
        UiEvents.functions.Save("demoGrid");
        }
       

        };

    self.Edit = function editrow(rowIndx) {
        var a=rowIndx;
        var b=$('#demoGrid').pqGrid("getRowData", {rowIndx: a});
        obj.MyAddress().AddressId(b.AddressId);
        obj.MyAddress().District(b.District);
        obj.MyAddress().Ward(b.Ward);
        obj.MyAddress().Tole(b.Tole);
        obj.MyAddress().Zone(b.Zone);
        obj.MyAddress().ProvId(b.ProvId);
        self.canupdate(true);
        self.enableDisable(true);
        self.HdnId(rowIndx);
                  
        };



    const UiEvents = {
        validate: {
            SaveValidation: function () {
                if (obj.MyModel().Name() == "") {
                    $("#tabs").tabs({ active: 0 });
                    $("#name").focus();
                    $("#errorMessage").html(' Name is required');
                    $("#dialogbox").dialog("open");
                    return;
                }
                else if (isNullOrEmpty(self.MyModel().SalutationId())) {
                    $("#ddlSalutation").focus();
                    $("#errorMessage").html('Please select your salutation');
                    $("#dialogbox").dialog("open");
                    return;
                }

                else if (obj.MyModel().Email() == '') {
                    $("#tabs").tabs({ active: 0 });
                    $("#email").focus();

                    $("#errorMessage").html('Email is required');

                    $("#dialogbox").dialog("open");

                    return;
                }

                else if ((!(/^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i).test(obj.MyModel().Email()))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#email").focus();
                    $("#errorMessage").html('Invalid Email address');
                    $("#dialogbox").dialog("open");
                    return;
                }

                else if (obj.MyModel().Phone() == "") {
                    $("#tabs").tabs({ active: 0 });
                    $("#phone").focus();
                    $("#errorMessage").html('Phone Number is required');
                    $("#dialogbox").dialog("open");

                    return;
                }
                else if (!($.isNumeric(obj.MyModel().Phone()))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#phone").focus();
                    $("#errorMessage").html('Invalid phone Number');
                    $("#dialogbox").dialog("open");
                    return;
                }

                else if (!((/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/).test(obj.MyModel().Phone()))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#phone").focus();
                    $("#errorMessage").html('Invalid number');
                    $("#dialogbox").dialog("open");
                    return;
                }



                else if (!($.isNumeric(obj.MyModel().Age()))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#age").focus();
                    $("#errorMessage").html('Age is required');
                    $("#dialogbox").dialog("open");
                    return;
                }

                else if (!((obj.MyModel().Age() < 100) && (obj.MyModel().Age() > 16))) {
                    $("#tabs").tabs({ active: 0 });
                    $("#age").focus();
                    $("#errorMessage").html('Invalid Age');
                    $("#dialogbox").dialog("open");
                    return;
                }

                else if ((self.MyModel().edu()) == "") {
                    $("#SLC").focus();
                    $("#errorMessage").html(' Please select your Education');
                    $("#dialogbox").dialog("open");
                    return false;
                }

                else if (isNullOrEmpty(self.MyAddress().AddressId())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#AdId").focus();
                    $("#errorMessage").html('Please select your  address type');
                    $("#dialogbox").dialog("open");
                    return;
                }


                else if (obj.MyAddress().District() == '') {
                    $("#tabs").tabs({ active: 1 });
                    $("#tDis").focus();
                    $("#errorMessage").html('District is required');
                    $("#dialogbox").dialog("open");

                    return;
                }


                else if (obj.MyAddress().Zone() == '') {
                    $("#tabs").tabs({ active: 1 });
                    $("#tzone").focus();
                    $("#errorMessage").html('Zone is required');
                    $("#dialogbox").dialog("open");

                    return;
                }


                else if (obj.MyAddress().Tole() == '') {
                    $("#tabs").tabs({ active: 1 });
                    $("#ttol").focus();
                    $("#errorMessage").html('Tole is required');
                    $("#dialogbox").dialog("open");

                    return;
                }

                else if (obj.MyAddress().Ward() == '') {
                    $("#tabs").tabs({ active: 1 });
                    $("#tward").focus();
                    $("#errorMessage").html('Ward no. is required');
                    $("#dialogbox").dialog("open");

                    return;
                }

                else if (!($.isNumeric(obj.MyAddress().Ward()))) {
                    $("#tabs").tabs({ active: 1 });
                    $("#tward").focus();
                    $("#errorMessage").html('Invalid Ward Number');
                    $("#dialogbox").dialog("open");
                    return;
                }
                    
                else if (isNullOrEmpty(self.MyAddress().ProvId())) {
                    $("#Temprov").focus();
                    $("#errorMessage").html('Please select your  Province');
                    $("#dialogbox").dialog("open");
                    return;
                }

                
                else {
                    //if ((ko.toJS(obj.DataList)).find(x => (x.Name == self.MyModel().Name()) && (x.Age == self.MyModel().Age()) && (x.Phone == self.MyModel().Phone()) && (x.Email == self.MyModel().Email()))) {
                    //      $("#errorMessage").html('Data already exists!!!!');
                    //        $("#dialogbox").dialog("open");
                    //        return;
                    //    }
                    //else
                    //{
                       
                        self.MyModel().SalutationName((self.SalutationList().find(X => X.Value == self.MyModel().SalutationId()) || {}).Text);
                    self.MyAddress().AddressName((self.AddressList().find(X => X.Value == self.MyAddress().AddressId()) || {}).Text);
                    self.MyAddress().Province((self.ProvinceList().find(X => X.Value == self.MyAddress().ProvId()) || {}).Text);
                    self.DataList.push(ko.toJS(self.MyAddress()));
                      
                        //self.enableDisable(false);
                        //self.enablesub(false);
                        //self.enableclear(false);
                        //self.enableadd(true);
                        return true;
                    //}
                }
            },

            UpdateValidation: function () {
                if (isNullOrEmpty(self.MyAddress().AddressId())) {
                    $("#tabs").tabs({ active: 1 });
                    $("#AdId").focus();
                    $("#errorMessage").html('Please select your  address type');
                    $("#dialogbox").dialog("open");
                    return;
                }


                else if (obj.MyAddress().District() == '') {
                    $("#tabs").tabs({ active: 1 });
                    $("#tDis").focus();
                    $("#errorMessage").html('District is required');
                    $("#dialogbox").dialog("open");

                    return;
                }


                else if (obj.MyAddress().Zone() == '') {
                    $("#tabs").tabs({ active: 1 });
                    $("#tzone").focus();
                    $("#errorMessage").html('Zone is required');
                    $("#dialogbox").dialog("open");

                    return;
                }


                else if (obj.MyAddress().Tole() == '') {
                    $("#tabs").tabs({ active: 1 });
                    $("#ttol").focus();
                    $("#errorMessage").html('Tole is required');
                    $("#dialogbox").dialog("open");

                    return;
                }

                else if (obj.MyAddress().Ward() == '') {
                    $("#tabs").tabs({ active: 1 });
                    $("#tward").focus();
                    $("#errorMessage").html('Ward no. is required');
                    $("#dialogbox").dialog("open");

                    return;
                }

                else if (!($.isNumeric(obj.MyAddress().Ward()))) {
                    $("#tabs").tabs({ active: 1 });
                    $("#tward").focus();
                    $("#errorMessage").html('Invalid Ward Number');
                    $("#dialogbox").dialog("open");
                    return;
                }

                else if (isNullOrEmpty(self.MyAddress().ProvId())) {
                    $("#Temprov").focus();
                    $("#errorMessage").html('Please select your  Province');
                    $("#dialogbox").dialog("open");
                    return;
                }
                else {
                    return true;
                }

            }
        },
        clear: {
            ResetAll: function () {
                self.MyModel(new models.MyModel());
                self.MyAddress(new models.MyAddress());
                self.DataList([]);
            },

            FieldClear: function () {
                self.MyModel(new models.MyModel());
                self.MyAddress(new models.MyAddress());
                $("#txtName").focus();
            },
        },
        functions: {
            Save: function (control) {
               
                if ($("#" + control).pqGrid("instance")) {
                    // $("#" + control).pqGrid("destroy");
                    $("#" + control).pqGrid('option', 'dataModel.data', ko.toJS(self.DataList()));
                    $("#" + control).pqGrid('refreshDataAndView');
                } else
                 {
                    const options = Object.assign({}, pqOptions);
                    options.colModel =  [
                        { title: "AddressType", align: "center", dataIndx: "AddressName", width: "10%" },
                        { title: "District", align: "center", dataIndx: "District", width: "20%" },
                        { title: "Ward", align: "center", dataIndx: "Ward", width: "10%" },
                        { title: "Zone", align: "center", dataIndx: "Zone", width: "10%" },
                        { title: "Tole", align: "center", dataIndx: "Tole", width: "20%" },
                        { title: "Province", align: "center", dataIndx: "Province", width: "10%" },
                        {title: "Action",  width: "20%", render: function (ui) 
                          { 
                            return `<button class="btn-edit" onclick="obj.Edit(${ui.rowIndx});" type="button">Edit</button><button class="btn-delete" onclick="obj.delete(${ui.rowIndx});" type="button">Delete</button>`;}
                        }
                    ];

                    options.dataModel = { data: ko.toJS(self.DataList()) };
                    options.showBottom = false;
                    
                    $("#" + control).pqGrid(options);
                }
            }
        },

    };


   
    function Init() {
        models.UiElements();
        $("#tabs").tabs();
        UiEvents.clear.ResetAll();
        $("#tabs, #tabs-2").click(function () {
            
            UiEvents.functions.Save("demoGrid");

        });
       
      
    }
    Init();
}

var obj;

$(document).ready(function () {
    obj = new IndexVM();
    ko.applyBindings(obj);

});
