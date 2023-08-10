using System;
using System.Collections.Generic;
using BSSystem.Service.BSTestService.Models.Filters;
using VSSystem.ThirdParty.Selenium.Actions;

namespace BSSystem.Service.BSTestService.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class CSAAction : AAction
    {
        CSAFilters _Filters;
        public CSAFilters Filters
        {
            get { return _Filters; }
            set
            {
                _Filters = value;
            }
        }
        public override List<WebAction> ToWebActions(string baseUrl, string sessionFormat)
        {
            DateTime now = DateTime.Now;
            var result = new List<VSSystem.ThirdParty.Selenium.Actions.WebAction>();
            try
            {
                if (_Filters != null)
                {
                    int nLastCCs;
                    int.TryParse(_Filters.NumberOfSelectedLastCartridgeCases, out nLastCCs);
                    bool haveSelectedCC = false;
                    if (nLastCCs == -1)
                    {
                        haveSelectedCC = true;
                        result.Add(new WebAction
                        {
                            DelaySeconds = 5,
                            Props = new ElementProps("chkSelectAll")
                            {
                                ParentID = "divPageContent",
                                Checked = true
                            }
                        });
                    }
                    else if (nLastCCs > 1)
                    {
                        haveSelectedCC = true;
                        WebAction selectCCActionObj = new WebAction
                        {
                            DelaySeconds = 5,
                            Props = new ElementProps("main_table_grid")
                        };
                        selectCCActionObj.Props.Actions = new List<WebAction>();
                        for (int i = 0; i < nLastCCs; i++)
                        {
                            selectCCActionObj.Props.Actions.Add(new WebAction
                            {
                                Props = new ElementProps
                                {
                                    ClassItem = new ClassProps("ajaxselect", i),
                                    Checked = true
                                }
                            });
                        }
                        result.Add(selectCCActionObj);
                    }
                    else if (_Filters.CartridgeCases?.Count > 0)
                    {
                        haveSelectedCC = true;
                        WebAction selectCCActionObj = new WebAction
                        {
                            DelaySeconds = 5,
                            Props = new ElementProps("main_table_grid")
                        };
                        selectCCActionObj.Props.Actions = new List<WebAction>();
                        foreach (var ccInfo in _Filters.CartridgeCases)
                        {
                            selectCCActionObj.Props.Actions.Add(new WebAction
                            {
                                Props = new ElementProps
                                {
                                    TagItem = new TagProps()
                                    {
                                        TagName = "tr",
                                        Attributes = new List<AttributeProps>
                                        {
                                            new AttributeProps{
                                                Name = "info",
                                                ContentType = VSSystem.Net.ContentType.Json,
                                                JsonFields = new List<AttributeProps.JsonField>{
                                                    new AttributeProps.JsonField("CaseNumber", ccInfo.CaseIncident),
                                                    new AttributeProps.JsonField("CasingNumber", ccInfo.CartridgeCaseNumber),
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
                                            }
                                        }
                                    }
                                },
                            });
                        }
                        result.Add(selectCCActionObj);

                    }
                    if (haveSelectedCC)
                    {
                        result.Add(new WebAction()
                        {
                            DelaySeconds = 1,
                            Props = new ElementProps("ctl00_ContentPlaceHolder1_btnAnalysisReport"),
                            Click = true
                        });
                        WebAction csaWaitingActionObj = new WebAction
                        {
                            DelaySeconds = 5,
                            Props = new ElementProps
                            {
                                SwitchToNewWindow = true,
                                CloseWindow = true
                            }
                        };
                        csaWaitingActionObj.Actions = new List<WebAction>();
                        csaWaitingActionObj.Actions.Add(new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait)
                        {
                            DelaySeconds = 3,
                            Props = new ElementProps("loadingUI")
                            {
                                Displayed = false
                            },
                        });
                        csaWaitingActionObj.Actions.Add(new WebAction
                        {
                            Props = new ElementProps()
                            {
                                TagItem = new TagProps("button", text: "Wait")
                            },
                            Click = true
                        });
                        csaWaitingActionObj.Actions.Add(new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait)
                        {
                            DelaySeconds = 3,
                            Props = new ElementProps("loadingUI")
                            {
                                Displayed = false
                            }
                        });
                        csaWaitingActionObj.Actions.Add(new WebAction()
                        {
                            DelaySeconds = 1,
                            ShiftKey = true,
                            PressKeys = new List<string>() { "f" }
                        });

                        if (_pTakeScreenShot)
                        {
                            csaWaitingActionObj.Actions.Add(new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot)
                            {
                                DelaySeconds = 3,
                                FileName = "CSA",
                                FolderPath = string.Format("{0}/screenshots/{1}", ServiceConfig.pools_temp, string.Format(sessionFormat, now)),
                            });
                        }

                        result.Add(csaWaitingActionObj);
                    }
                }

            }
            catch { }
            return result;
        }


    }
}