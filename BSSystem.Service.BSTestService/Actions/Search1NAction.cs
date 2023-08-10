using System;
using System.Collections.Generic;
using BSSystem.Service.BSTestService.Models.Filters;
using VSSystem.ThirdParty.Selenium.Actions;

namespace BSSystem.Service.BSTestService.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class Search1NAction : AAction
    {
        CartridgeCaseFilter _SelectedCartridgeCase;
        public CartridgeCaseFilter SelectedCartridgeCase { get { return _SelectedCartridgeCase; } set { _SelectedCartridgeCase = value; } }
        Search1NFilters _Filters;
        public Search1NFilters Filters { get { return _Filters; } set { _Filters = value; } }
        AuditInquiry _AuditInquiry;
        public AuditInquiry AuditInquiry { get { return _AuditInquiry; } set { _AuditInquiry = value; } }
        public override List<WebAction> ToWebActions(string baseUrl, string sessionFormat)
        {
            DateTime now = DateTime.Now;
            var result = new List<VSSystem.ThirdParty.Selenium.Actions.WebAction>();
            try
            {
                if (_SelectedCartridgeCase != null)
                {
                    WebAction selectCCActionObj = new WebAction
                    {
                        DelaySeconds = 5,
                        Props = new ElementProps("main_table_grid")
                    };
                    selectCCActionObj.Props.Actions = new List<WebAction>();

                    result.Add(new WebAction
                    {
                        Props = new ElementProps
                        {
                            TagItem = new TagProps
                            {
                                TagName = "tr",
                                Attributes = new List<AttributeProps>
                                {
                                    new AttributeProps{
                                        Name = "info",
                                        ContentType = VSSystem.Net.ContentType.Json,
                                        JsonFields = new List<AttributeProps.JsonField>{
                                            new AttributeProps.JsonField("CaseNumber", _SelectedCartridgeCase.CaseIncident),
                                            new AttributeProps.JsonField("CasingNumber", _SelectedCartridgeCase.CartridgeCaseNumber),
                                        }
                                    }
                                }
                            },
                            Actions = new List<WebAction>{
                                new WebAction{
                                    Props = new ElementProps
                                    {
                                        ClassItem = new ClassProps("ajaxselect", 0),
                                        Checked = true
                                    },
                                }
                            }
                        },
                    });

                    result.Add(selectCCActionObj);
                }
                if (true)
                {
                    result.Add(new WebAction
                    {
                        DelaySeconds = 1,
                        Props = new ElementProps("ctl00_ContentPlaceHolder1_btnSearchFace"),
                        Click = true
                    });

                    result.Add(new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Validate)
                    {
                        DelaySeconds = 5,
                        Title = "Ballistics IQ - Potential Link"
                    });

                    var search1NActionObj = new WebAction
                    {
                        DelaySeconds = 1,
                        Actions = new List<WebAction>
                        {
                            new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait)
                            {
                                DelaySeconds = 3,
                                Props = new ElementProps(){
                                    ClassItem = new ClassProps("modalPopup"),
                                    Displayed = false
                                }
                            }
                        }
                    };

                    if (_Filters != null)
                    {
                        if (!string.IsNullOrWhiteSpace(_Filters.Caliber) && !_Filters.Caliber.Equals("all", StringComparison.InvariantCultureIgnoreCase))
                        {
                            search1NActionObj.Actions.Add(new WebAction()
                            {
                                DelaySeconds = 1,
                                Props = new ElementProps()
                                {
                                    ClassItem = new ClassProps("ms-options-wrap", 0)
                                },
                                Click = true
                            });
                            search1NActionObj.Actions.Add(new WebAction
                            {
                                DelaySeconds = 1,
                                Props = new ElementProps
                                {
                                    Name = "Caliber",
                                    Actions = new List<WebAction>(){
                                    new WebAction{
                                        Props = new ElementProps{
                                            TagItem = new TagProps("label", text: _Filters.Caliber)
                                        },
                                        Click = true
                                    }
                                }
                                }
                            });
                        }
                        if (!string.IsNullOrWhiteSpace(_Filters.CaseIncidents))
                        {
                            search1NActionObj.Actions.Add(new WebAction()
                            {
                                DelaySeconds = 1,
                                Props = new ElementProps("ctl00_ContentPlaceHolder1_ucBallisticFilter_txtCaseNumber")
                                {
                                    ParentID = "ctl00_ContentPlaceHolder1_UpdatePanel5",
                                    Text = string.Format(_Filters.CaseIncidents, now)
                                }
                            });
                        }
                        if (!string.IsNullOrWhiteSpace(_Filters.Score))
                        {
                            search1NActionObj.Actions.Add(new WebAction()
                            {
                                DelaySeconds = 1,
                                Props = new ElementProps("ctl00_ContentPlaceHolder1_ucBallisticFilter_cboScore")
                                {
                                    Type = "select",
                                    ParentID = "ctl00_ContentPlaceHolder1_UpdatePanel5",
                                    Text = _Filters.Score
                                }
                            });
                        }
                        if (!string.IsNullOrWhiteSpace(_Filters.BreechFaceCharacteristics) && !_Filters.BreechFaceCharacteristics.Equals("all", StringComparison.InvariantCultureIgnoreCase))
                        {
                            search1NActionObj.Actions.Add(new WebAction()
                            {
                                DelaySeconds = 1,
                                Props = new ElementProps("ctl00_ContentPlaceHolder1_ucBallisticFilter_dropBreechFace")
                                {
                                    Type = "select",
                                    ParentID = "ctl00_ContentPlaceHolder1_UpdatePanel5",
                                    Text = _Filters.BreechFaceCharacteristics
                                }
                            });
                        }
                        if (!string.IsNullOrWhiteSpace(_Filters.FiringPinShape) && !_Filters.FiringPinShape.Equals("all", StringComparison.InvariantCultureIgnoreCase))
                        {
                            search1NActionObj.Actions.Add(new WebAction()
                            {
                                DelaySeconds = 1,
                                Props = new ElementProps("ctl00_ContentPlaceHolder1_ucBallisticFilter_cboFiringPinShape")
                                {
                                    Type = "select",
                                    ParentID = "ctl00_ContentPlaceHolder1_UpdatePanel5",
                                    Text = _Filters.FiringPinShape
                                }
                            });
                        }
                        if (!string.IsNullOrWhiteSpace(_Filters.FirearmType) && !_Filters.FirearmType.Equals("all", StringComparison.InvariantCultureIgnoreCase))
                        {
                            search1NActionObj.Actions.Add(new WebAction()
                            {
                                DelaySeconds = 1,
                                Props = new ElementProps("ctl00_ContentPlaceHolder1_ucBallisticFilter_cboFirearm")
                                {
                                    Type = "select",
                                    ParentID = "ctl00_ContentPlaceHolder1_UpdatePanel5",
                                    Text = _Filters.FirearmType
                                }
                            });
                        }
                        if (!string.IsNullOrWhiteSpace(_Filters.Make) && !_Filters.Make.Equals("all", StringComparison.InvariantCultureIgnoreCase))
                        {
                            search1NActionObj.Actions.Add(new WebAction()
                            {
                                DelaySeconds = 1,
                                Props = new ElementProps("ctl00_ContentPlaceHolder1_ucBallisticFilter_cboMake")
                                {
                                    Type = "select",
                                    ParentID = "ctl00_ContentPlaceHolder1_UpdatePanel5",
                                    Text = _Filters.Make
                                }
                            });
                        }
                        if (!string.IsNullOrWhiteSpace(_Filters.Model) && !_Filters.Model.Equals("all", StringComparison.InvariantCultureIgnoreCase))
                        {
                            search1NActionObj.Actions.Add(new WebAction()
                            {
                                DelaySeconds = 1,
                                Props = new ElementProps("ctl00_ContentPlaceHolder1_ucBallisticFilter_cboModel")
                                {
                                    Type = "select",
                                    ParentID = "ctl00_ContentPlaceHolder1_UpdatePanel5",
                                    Text = _Filters.Model
                                }
                            });
                        }
                        if (!string.IsNullOrWhiteSpace(_Filters.LocationOfIncident))
                        {
                            search1NActionObj.Actions.Add(new WebAction()
                            {
                                DelaySeconds = 1,
                                Props = new ElementProps("chkSearchLocation")
                                {
                                    ParentID = "ctl00_ContentPlaceHolder1_UpdatePanel5",
                                },
                                Click = true
                            });
                            search1NActionObj.Actions.Add(new WebAction()
                            {
                                DelaySeconds = 1,
                                Props = new ElementProps("imgShowMapSearch")
                                {
                                    ParentID = "ctl00_ContentPlaceHolder1_UpdatePanel5",
                                },
                                Click = true
                            });
                            search1NActionObj.Actions.Add(new WebAction()
                            {
                                DelaySeconds = 3,
                                Props = new ElementProps("form1")
                                {
                                    IFrameID = "iframeMap_Search",
                                    Actions = new List<WebAction>
                                {
                                    new WebAction{
                                        DelaySeconds = 1,
                                        Props = new ElementProps("txtAddressSearch"){
                                            Value = _Filters.LocationOfIncident
                                        }
                                    },
                                    new WebAction{
                                        DelaySeconds = 1,
                                        Props = new ElementProps("btnFind"),
                                        Click = true
                                    },
                                    new WebAction{
                                        DelaySeconds = 5,
                                        Props = new ElementProps("btnApply"),
                                        Click = true
                                    }
                                }
                                }
                            });
                            search1NActionObj.Actions.Add(new WebAction()
                            {
                                DelaySeconds = 3,
                                Props = new ElementProps("btnControl_0")
                                {
                                    ParentID = "tdControlButton"
                                },
                                Click = true
                            });
                            search1NActionObj.Actions.Add(new WebAction()
                            {
                                DelaySeconds = 1,
                                Props = new ElementProps("txtRadius")
                                {
                                    ParentID = "ctl00_ContentPlaceHolder1_UpdatePanel5",
                                    Text = _Filters.Radius
                                }
                            });
                        }
                        if (!string.IsNullOrWhiteSpace(_Filters.NumberOfCandidates))
                        {
                            search1NActionObj.Actions.Add(new WebAction()
                            {
                                DelaySeconds = 1,
                                Props = new ElementProps("ctl00_ContentPlaceHolder1_dropLevelSearch")
                                {
                                    Type = "select",
                                    ParentID = "ctl00_ContentPlaceHolder1_UpdatePanel5",
                                    Text = _Filters.NumberOfCandidates
                                }
                            });
                        }

                        if (!string.IsNullOrWhiteSpace(_Filters.Agency) && !_Filters.Agency.Equals("all", StringComparison.InvariantCultureIgnoreCase))
                        {
                            search1NActionObj.Actions.Add(new WebAction()
                            {
                                DelaySeconds = 1,
                                Props = new ElementProps("ctl00_ContentPlaceHolder1_cboAgency")
                                {
                                    Type = "select",
                                    ParentID = "ctl00_ContentPlaceHolder1_UpdatePanel5",
                                    Text = _Filters.Agency
                                }
                            });

                            if (_Filters.Agency == "Shared")
                            {
                                search1NActionObj.Actions.Add(new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait)
                                {
                                    DelaySeconds = 3,
                                    Props = new ElementProps()
                                    {
                                        ClassItem = new ClassProps("modalPopup"),
                                        Displayed = false
                                    }
                                });
                                if (_Filters.SharedAgencies?.Count > 0)
                                {
                                    search1NActionObj.Actions.Add(new WebAction()
                                    {
                                        DelaySeconds = 5,
                                        Props = new ElementProps("ctl00_ContentPlaceHolder1_ucUserShared_gridUserShared_ctl01_CKHeaderUserShare")
                                        {
                                            ParentID = "ctl00_ContentPlaceHolder1_ucUserShared_gridUserShared"
                                        },
                                        Click = true
                                    });
                                    // foreach (var value in _Filters.SharedAgencies)
                                    // {
                                    //     search1NActionObj.Actions.Add(new WebAction()
                                    //     {
                                    //         DelaySeconds = 1,
                                    //         Props = new ElementProps()
                                    //         {
                                    //             ParentID = "ctl00_ContentPlaceHolder1_ucUserShared_gridUserShared",
                                    //             TagItem = new TagProps("label", text: value)
                                    //         },
                                    //         Click = true
                                    //     });
                                    // }
                                }

                            }
                            if (_Filters.States?.Count > 0)
                            {
                                // search1NActionObj.Actions.Add(new WebAction()
                                // {
                                //     DelaySeconds = 5,
                                //     Props = new ElementProps("ctl00_ContentPlaceHolder1_gridState_ctl01_CKHeaderState")
                                //     {
                                //         ParentID = "ctl00_ContentPlaceHolder1_gridState"
                                //     },
                                //     Click = true
                                // });
                                // foreach (var value in _Filters.States)
                                // {
                                //     search1NActionObj.Actions.Add(new WebAction()
                                //     {
                                //         DelaySeconds = 1,
                                //         Props = new ElementProps()
                                //         {
                                //             ParentID = "ctl00_ContentPlaceHolder1_gridState"
                                //             TagItem = new TagProps("label", text: value)
                                //         },
                                //         Click = true
                                //     });
                                // }
                            }
                            // if (_Filters.Counties?.Count > 0)
                            // {
                            //     search1NActionObj.Actions.Add(new WebAction()
                            //     {
                            //         DelaySeconds = 1,
                            //         Props = new ElementProps()
                            //         {
                            //             ClassItem = new ClassProps("ms-options-wrap", 0),
                            //             ParentID = "tdCounty"
                            //         },
                            //         Click = true
                            //     });
                            //     WebAction countyAction = new WebAction
                            //     {
                            //         DelaySeconds = 1,
                            //         Props = new ElementProps
                            //         {
                            //             Name = "County_GL"
                            //         }
                            //     };
                            //     countyAction.Props.Actions = new List<WebAction>();
                            //     foreach (var value in _Filters.Counties)
                            //     {
                            //         countyAction.Props.Actions.Add(new WebAction()
                            //         {
                            //             DelaySeconds = 1,
                            //             Props = new ElementProps()
                            //             {
                            //                 TagItem = new TagProps("label", text: value)
                            //             },
                            //             Click = true
                            //         });
                            //     }
                            //     search1NActionObj.Actions.Add(countyAction);
                            // }
                        }
                        if (!string.IsNullOrWhiteSpace(_Filters.ResultSameCaseIncident))
                        {
                            search1NActionObj.Actions.Add(new WebAction()
                            {
                                DelaySeconds = 1,
                                Props = new ElementProps("ctl00_ContentPlaceHolder1_chkIncludeItSelf")
                                {
                                    Checked = true
                                },
                            });
                            if (_Filters.ResultSameCaseIncident.Equals("without filters", StringComparison.InvariantCultureIgnoreCase))
                            {
                                search1NActionObj.Actions.Add(new WebAction()
                                {
                                    DelaySeconds = 1,
                                    Props = new ElementProps
                                    {
                                        TagItem = new TagProps("span", text: "Include same case incident without filters")
                                    },
                                    Click = true
                                });
                            }
                        }
                        else
                        {
                            search1NActionObj.Actions.Add(new WebAction()
                            {
                                DelaySeconds = 1,
                                Props = new ElementProps("ctl00_ContentPlaceHolder1_chkIncludeItSelf")
                                {
                                    Checked = false
                                }
                            });
                        }
                        search1NActionObj.Actions.Add(new WebAction()
                        {
                            DelaySeconds = 1,
                            Props = new ElementProps("ctl00_ContentPlaceHolder1_chkIncludeTestFired")
                            {
                                Checked = _Filters.ResultIncludeTestFired ?? false
                            }
                        });
                    }

                    search1NActionObj.Actions.Add(new WebAction
                    {
                        DelaySeconds = 1,
                        Props = new ElementProps("ctl00_ContentPlaceHolder1_btnQuickSearch"),
                        Click = true
                    });

                    search1NActionObj.Actions.Add(new WebAction()
                    {
                        DelaySeconds = 1,
                        Props = new ElementProps("infodiv")
                        {
                            IFrameID = "GCTIFrame",
                            Actions = new List<WebAction> {
                                new WebAction{
                                    Props = new ElementProps("txtCaseNumber"){
                                        Value = string.IsNullOrWhiteSpace(_AuditInquiry?.CaseNumber) ? "Test Selenium" : string.Format(_AuditInquiry.CaseNumber, now)
                                    }
                                },
                                new WebAction()
                                {
                                    Props = new ElementProps("txtPurpose")
                                    {
                                        Text = string.IsNullOrWhiteSpace(_AuditInquiry?.AuthorizedPurpose) ? string.Empty : string.Format(_AuditInquiry.AuthorizedPurpose, now)
                                    },
                                },
                                new WebAction{
                                    Props = new ElementProps("btnContinue"),
                                    Click=true
                                }
                            }
                        },
                    });

                    search1NActionObj.Actions.Add(new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait)
                    {
                        DelaySeconds = 3,
                        Props = new ElementProps()
                        {
                            ClassItem = new ClassProps("modalPopup"),
                            Displayed = false
                        }
                    });
                    search1NActionObj.Actions.Add(new WebAction
                    {
                        DelaySeconds = 1,
                        Props = new ElementProps
                        {
                            ParentID = "tdControlButton",
                            TagItem = new TagProps("input", value: "wait")
                        },
                        Click = true
                    });
                    search1NActionObj.Actions.Add(new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait)
                    {
                        DelaySeconds = 3,
                        Props = new ElementProps()
                        {
                            ClassItem = new ClassProps("modalPopup"),
                            Displayed = false
                        }
                    });
                    search1NActionObj.Actions.Add(new WebAction
                    {
                        DelaySeconds = 1,
                        Props = new ElementProps
                        {
                            ParentID = "tdControlButton",
                            TagItem = new TagProps("input", value: "ok")
                        },
                        Click = true
                    });

                    search1NActionObj.Actions.Add(new WebAction()
                    {
                        DelaySeconds = 3,
                        Props = new ElementProps("ctl00_ContentPlaceHolder1_cboSelectImageSize")
                        {
                            Type = "select",
                            ParentID = "tdViewStyle",
                            Text = "Medium"
                        }
                    });

                    search1NActionObj.Actions.Add(new WebAction
                    {
                        DelaySeconds = 3,
                        Props = new ElementProps("ctl00_ContentPlaceHolder1_lblSearchFace"),
                        Click = true
                    });


                    if (_pTakeScreenShot)
                    {
                        search1NActionObj.Actions.Add(new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot)
                        {
                            DelaySeconds = 3,
                            FileName = "Search1N",
                            FolderPath = string.Format("{0}/screenshots/{1}", ServiceConfig.pools_temp, string.Format(sessionFormat, now)),
                        });
                    }
                    result.Add(search1NActionObj);
                }
            }
            catch { }
            return result;
        }
    }
}