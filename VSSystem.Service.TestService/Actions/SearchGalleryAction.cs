using System;
using System.Collections.Generic;
using VSSystem.Service.TestService.Models.Filters;
using VSSystem.ThirdParty.Selenium.Actions;

namespace VSSystem.Service.TestService.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class SearchGalleryAction : AAction
    {
        SearchGalleryFilters _Filters;
        public SearchGalleryFilters Filters { get { return _Filters; } set { _Filters = value; } }
        AuditInquiry _AuditInquiry;
        public AuditInquiry AuditInquiry { get { return _AuditInquiry; } set { _AuditInquiry = value; } }
        CSAAction _CSAAction;
        public CSAAction CSAAction { get { return _CSAAction; } set { _CSAAction = value; } }
        ComparisonAction _ComparisonAction;
        public ComparisonAction ComparisonAction { get { return _ComparisonAction; } set { _ComparisonAction = value; } }
        Search1NAction _Search1NAction;
        public Search1NAction Search1NAction { get { return _Search1NAction; } set { _Search1NAction = value; } }
        public override List<WebAction> ToWebActions(string baseUrl, string sessionFormat)
        {
            DateTime now = DateTime.Now;
            var result = new List<VSSystem.ThirdParty.Selenium.Actions.WebAction>();
            try
            {
                result.Add(new WebAction() { Url = $"{baseUrl}/GUI/ViewGalleryList.aspx" });
                result.Add(new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Validate)
                {
                    Title = "Ballistics IQ - Gallery Management > Search Gallery"
                });

                result.Add(new WebAction()
                {
                    DelaySeconds = 3,
                    Props = new ElementProps("btnCancel")
                    {
                        IFrameID = "GCTIFrame"
                    },
                    Click = true
                });

                if (_Filters != null)
                {
                    if (!string.IsNullOrWhiteSpace(_Filters.CaseIncidents))
                    {
                        result.Add(new WebAction()
                        {
                            DelaySeconds = 1,
                            Props = new ElementProps("ctl00_ContentPlaceHolder1_ucNameFilter_txtCaseNumber")
                            {
                                ParentID = "box-filter",
                                Text = string.Format(_Filters.CaseIncidents, now)
                            }
                        });
                    }
                    if (!string.IsNullOrWhiteSpace(_Filters.Category) && !_Filters.Category.Equals("all", StringComparison.InvariantCultureIgnoreCase))
                    {
                        result.Add(new WebAction()
                        {
                            DelaySeconds = 1,
                            Props = new ElementProps("ctl00_ContentPlaceHolder1_ucNameFilter_cboCategory")
                            {
                                Type = "select",
                                ParentID = "box-filter",
                                Text = _Filters.Category
                            }
                        });
                    }
                    if (!string.IsNullOrWhiteSpace(_Filters.Caliber) && !_Filters.Caliber.Equals("all", StringComparison.InvariantCultureIgnoreCase))
                    {
                        result.Add(new WebAction()
                        {
                            DelaySeconds = 1,
                            Props = new ElementProps()
                            {
                                ClassItem = new ClassProps("ms-options-wrap", 0)
                            },
                            Click = true
                        });
                        result.Add(new WebAction
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
                    if (!string.IsNullOrWhiteSpace(_Filters.BreechFaceCharacteristics) && !_Filters.BreechFaceCharacteristics.Equals("all", StringComparison.InvariantCultureIgnoreCase))
                    {
                        result.Add(new WebAction()
                        {
                            DelaySeconds = 1,
                            Props = new ElementProps("ctl00_ContentPlaceHolder1_ucNameFilter_dropBreechFace")
                            {
                                Type = "select",
                                ParentID = "box-filter",
                                Text = _Filters.BreechFaceCharacteristics
                            }
                        });
                    }
                    if (!string.IsNullOrWhiteSpace(_Filters.FiringPinShape) && !_Filters.FiringPinShape.Equals("all", StringComparison.InvariantCultureIgnoreCase))
                    {
                        result.Add(new WebAction()
                        {
                            DelaySeconds = 1,
                            Props = new ElementProps("ctl00_ContentPlaceHolder1_ucNameFilter_cboFiringPinShape")
                            {
                                Type = "select",
                                ParentID = "box-filter",
                                Text = _Filters.FiringPinShape
                            }
                        });
                    }
                    if (!string.IsNullOrWhiteSpace(_Filters.FirearmType) && !_Filters.FirearmType.Equals("all", StringComparison.InvariantCultureIgnoreCase))
                    {
                        result.Add(new WebAction()
                        {
                            DelaySeconds = 1,
                            Props = new ElementProps("ctl00_ContentPlaceHolder1_ucNameFilter_cboFirearm")
                            {
                                Type = "select",
                                ParentID = "box-filter",
                                Text = _Filters.FirearmType
                            }
                        });
                    }
                    if (!string.IsNullOrWhiteSpace(_Filters.Make) && !_Filters.Make.Equals("all", StringComparison.InvariantCultureIgnoreCase))
                    {
                        result.Add(new WebAction()
                        {
                            DelaySeconds = 1,
                            Props = new ElementProps("ctl00_ContentPlaceHolder1_ucNameFilter_cboMake")
                            {
                                Type = "select",
                                ParentID = "box-filter",
                                Text = _Filters.Make
                            }
                        });
                    }
                    if (!string.IsNullOrWhiteSpace(_Filters.Model) && !_Filters.Model.Equals("all", StringComparison.InvariantCultureIgnoreCase))
                    {
                        result.Add(new WebAction()
                        {
                            DelaySeconds = 1,
                            Props = new ElementProps("ctl00_ContentPlaceHolder1_ucNameFilter_cboModel")
                            {
                                Type = "select",
                                ParentID = "box-filter",
                                Text = _Filters.Model
                            }
                        });
                    }
                    if (!string.IsNullOrWhiteSpace(_Filters.LocationOfIncident))
                    {
                        result.Add(new WebAction()
                        {
                            DelaySeconds = 1,
                            Props = new ElementProps("chkSearchLocation")
                            {
                                ParentID = "box-filter",
                            },
                            Click = true
                        });
                        result.Add(new WebAction()
                        {
                            DelaySeconds = 1,
                            Props = new ElementProps("imgShowMapSearch")
                            {
                                ParentID = "box-filter",
                            },
                            Click = true
                        });
                        result.Add(new WebAction()
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
                        result.Add(new WebAction()
                        {
                            DelaySeconds = 3,
                            Props = new ElementProps("btnControl_0")
                            {
                                ParentID = "tdControlButton"
                            },
                            Click = true
                        });
                        result.Add(new WebAction()
                        {
                            DelaySeconds = 1,
                            Props = new ElementProps("txtRadius")
                            {
                                ParentID = "box-filter",
                                Text = _Filters.Radius
                            }
                        });
                    }
                    if (!string.IsNullOrWhiteSpace(_Filters.Agency) && !_Filters.Agency.Equals("all", StringComparison.InvariantCultureIgnoreCase))
                    {
                        result.Add(new WebAction()
                        {
                            DelaySeconds = 1,
                            Props = new ElementProps("cboAgencyScope")
                            {
                                Type = "select",
                                ParentID = "box-filter",
                                Text = _Filters.Agency
                            }
                        });

                        result.Add(new WebAction()
                        {
                            DelaySeconds = 5,
                        });

                        if (_Filters.Agency == "Shared")
                        {
                            if (_Filters.SharedAgencies?.Count > 0)
                            {
                                result.Add(new WebAction()
                                {
                                    DelaySeconds = 5,
                                    Props = new ElementProps("chk-all-share")
                                    {
                                        ParentID = "list-share"
                                    },
                                    Click = true
                                });
                                foreach (var value in _Filters.SharedAgencies)
                                {
                                    result.Add(new WebAction()
                                    {
                                        DelaySeconds = 1,
                                        Props = new ElementProps()
                                        {
                                            ParentID = "list-share",
                                            TagItem = new TagProps("label", text: value)
                                        },
                                        Click = true
                                    });
                                }
                            }

                        }
                        if (_Filters.States?.Count > 0)
                        {
                            if (!_Filters.States[0].Equals("all", StringComparison.InvariantCultureIgnoreCase))
                            {
                                result.Add(new WebAction()
                                {
                                    DelaySeconds = 5,
                                    Props = new ElementProps("chk-all-state")
                                    {
                                        ParentID = "list-state"
                                    },
                                    Click = true
                                });
                                foreach (var value in _Filters.States)
                                {
                                    result.Add(new WebAction()
                                    {
                                        DelaySeconds = 1,
                                        Props = new ElementProps()
                                        {
                                            ParentID = "list-state",
                                            TagItem = new TagProps("label", text: value)
                                        },
                                        Click = true
                                    });
                                }
                            }

                        }
                        // if (_Filters.Counties?.Count > 0)
                        // {
                        //     result.Add(new WebAction()
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
                        //     result.Add(countyAction);
                        // }
                    }
                }

                result.Add(new WebAction()
                {
                    DelaySeconds = 3,
                    Props = new ElementProps()
                    {
                        ClassItem = new ClassProps("button100_green", "", "Search")
                    },
                    Click = true
                });
                result.Add(new WebAction
                {
                    DelaySeconds = 1,
                    Props = new ElementProps("infodiv")
                    {
                        IFrameID = "GCTIFrame",
                        Actions = new List<WebAction>{
                            new WebAction()
                            {
                                Props = new ElementProps("txtCaseNumber")
                                {
                                    Value = string.IsNullOrWhiteSpace(_AuditInquiry?.CaseNumber) ? "Test Selenium" : string.Format(_AuditInquiry.CaseNumber, now)
                                },
                            },
                            new WebAction()
                            {
                                Props = new ElementProps("txtPurpose")
                                {
                                    Text = string.IsNullOrWhiteSpace(_AuditInquiry?.AuthorizedPurpose) ? string.Empty : string.Format(_AuditInquiry.AuthorizedPurpose, now)
                                },
                            },
                            new WebAction()
                            {
                                Props = new ElementProps("btnContinue"),
                                Click = true
                            }
                        }
                    }
                });

                if (_pTakeScreenShot)
                {
                    result.Add(new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot)
                    {
                        DelaySeconds = 15,
                        FileName = "SearchGallery",
                        FolderPath = string.Format("{0}/screenshots/{1}", ServiceConfig.pools_temp, string.Format(sessionFormat, now)),
                    });
                }
                if (_CSAAction != null)
                {
                    var actionObjs = _CSAAction.ToWebActions(baseUrl, sessionFormat);
                    if (actionObjs?.Count > 0)
                    {
                        WebAction actionObj = new WebAction("_CSAAction")
                        {
                            DelaySeconds = 1,
                            Actions = actionObjs
                        };
                        result.Add(actionObj);
                    }
                }
                if (_ComparisonAction != null)
                {
                    var actionObjs = _ComparisonAction.ToWebActions(baseUrl, sessionFormat);
                    if (actionObjs?.Count > 0)
                    {
                        WebAction actionObj = new WebAction("_ComparisonAction")
                        {
                            DelaySeconds = 1,
                            Actions = actionObjs
                        };
                        result.Add(actionObj);
                    }

                }
                if (_Search1NAction != null)
                {
                    var actionObjs = _Search1NAction.ToWebActions(baseUrl, sessionFormat);
                    if (actionObjs?.Count > 0)
                    {
                        WebAction actionObj = new WebAction("_Search1NAction")
                        {
                            DelaySeconds = 1,
                            Actions = actionObjs
                        };
                        result.Add(actionObj);
                    }
                }
            }
            catch { }
            return result;
        }
    }
}