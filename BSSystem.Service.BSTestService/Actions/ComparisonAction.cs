using System;
using System.Collections.Generic;
using BSSystem.Service.BSTestService.Models.Filters;
using VSSystem.ThirdParty.Selenium.Actions;

namespace BSSystem.Service.BSTestService.Actions
{
    [Newtonsoft.Json.JsonObject(ItemNullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public class ComparisonAction : AAction
    {
        CartridgeCaseFilter _LeftCartridgeCase;
        public CartridgeCaseFilter LeftCartridgeCase { get { return _LeftCartridgeCase; } set { _LeftCartridgeCase = value; } }
        CartridgeCaseFilter _RightCartridgeCase;
        public CartridgeCaseFilter RightCartridgeCase { get { return _RightCartridgeCase; } set { _RightCartridgeCase = value; } }
        ScreenShotAction _AutoAlignAction;
        public ScreenShotAction AutoAlignAction { get { return _AutoAlignAction; } set { _AutoAlignAction = value; } }
        ScreenShotAction _PatternMatchingAction;
        public ScreenShotAction PatternMatchingAction { get { return _PatternMatchingAction; } set { _PatternMatchingAction = value; } }
        ScreenShotAction _ThreeDToolAction;
        public ScreenShotAction ThreeDToolAction { get { return _ThreeDToolAction; } set { _ThreeDToolAction = value; } }
        public override List<WebAction> ToWebActions(string baseUrl, string sessionFormat)
        {
            DateTime now = DateTime.Now;
            var result = new List<VSSystem.ThirdParty.Selenium.Actions.WebAction>();
            try
            {
                result.Add(new WebAction
                {
                    DelaySeconds = 3,
                    Props = new ElementProps("chkSelectAll")
                    {
                        ParentID = "divPageContent",
                        Checked = true
                    },
                });
                result.Add(new WebAction
                {
                    DelaySeconds = 3,
                    Props = new ElementProps("chkSelectAll")
                    {
                        ParentID = "divPageContent",
                        Checked = false
                    },
                });
                if (_LeftCartridgeCase != null && _RightCartridgeCase != null)
                {
                    WebAction selectCCActionObj = new WebAction
                    {
                        DelaySeconds = 5,
                        Props = new ElementProps("main_table_grid")
                    };
                    selectCCActionObj.Props.Actions = new List<WebAction>();
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
                                            new AttributeProps.JsonField("CaseNumber", _LeftCartridgeCase.CaseIncident),
                                            new AttributeProps.JsonField("CasingNumber", _LeftCartridgeCase.CartridgeCaseNumber),
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
                                            new AttributeProps.JsonField("CaseNumber", _RightCartridgeCase.CaseIncident),
                                            new AttributeProps.JsonField("CasingNumber", _RightCartridgeCase.CartridgeCaseNumber),
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
                    result.Add(selectCCActionObj);

                }
                else
                {
                    WebAction selectCCActionObj = new WebAction
                    {
                        DelaySeconds = 5,
                        Props = new ElementProps("main_table_grid")
                    };
                    selectCCActionObj.Props.Actions = new List<WebAction>();
                    for (int i = 0; i < 2; i++)
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
                if (true)
                {
                    result.Add(new WebAction
                    {
                        DelaySeconds = 3,
                        Props = new ElementProps("ctl00_ContentPlaceHolder1_btnCompare"),
                        Click = true
                    });
                    var comparisonActionObj = new WebAction
                    {
                        DelaySeconds = 3,
                        Props = new ElementProps
                        {
                            SwitchToNewWindow = true,
                            CloseWindow = true
                        }
                    };
                    comparisonActionObj.Actions = new List<WebAction>(){
                            new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait){
                                DelaySeconds = 5,
                                Props=new ElementProps("loadingUI"){
                                    IFrameID = "Compare2DTool",
                                    Displayed = false
                                },
                            }
                        };

                    if (_AutoAlignAction != null)
                    {
                        comparisonActionObj.Actions.Add(new WebAction
                        {
                            DelaySeconds = 3,
                            Props = new ElementProps("btnAutoMatching")
                            {
                                IFrameID = "Compare2DTool",
                                ParentID = "optioncontroller"
                            },
                            Click = true
                        });
                        comparisonActionObj.Actions.Add(new WebAction()
                        {
                            DelaySeconds = 3,
                            Props = new ElementProps()
                            {
                                IFrameID = "Compare2DTool",
                                ClassItem = new ClassProps("dialog-footer-center"),
                                Actions = new List<WebAction>{
                                        new WebAction{
                                            Props= new ElementProps{
                                                TagItem = new TagProps("button", text: "Yes")
                                            },
                                            Click = true
                                        }
                                    }
                            },
                        });
                        comparisonActionObj.Actions.Add(new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait)
                        {
                            DelaySeconds = 5,
                            Props = new ElementProps("loadingUI")
                            {
                                IFrameID = "Compare2DTool",
                                Displayed = false
                            },
                        });
                        if (_AutoAlignAction.pTakeScreenShot)
                        {
                            comparisonActionObj.Actions.Add(new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot)
                            {
                                DelaySeconds = 10,
                                FileName = "AutoAlign",
                                FolderPath = string.Format("{0}/screenshots/{1}", ServiceConfig.pools_temp, string.Format(sessionFormat, now)),
                            });
                        }
                    }

                    if (_PatternMatchingAction != null)
                    {
                        comparisonActionObj.Actions.Add(new WebAction
                        {
                            DelaySeconds = 5,
                            Props = new ElementProps("btnPatternMatching")
                            {
                                IFrameID = "Compare2DTool",
                                ParentID = "optioncontroller"
                            },
                            Click = true
                        });
                        comparisonActionObj.Actions.Add(new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.Wait)
                        {
                            DelaySeconds = 5,
                            Props = new ElementProps("loadingUI")
                            {
                                IFrameID = "Compare2DTool",
                                Displayed = false
                            },
                        });
                        if (_PatternMatchingAction.pTakeScreenShot)
                        {
                            comparisonActionObj.Actions.Add(new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot)
                            {
                                DelaySeconds = 10,
                                FileName = "PatternMatching",
                                FolderPath = string.Format("{0}/screenshots/{1}", ServiceConfig.pools_temp, string.Format(sessionFormat, now)),
                            });
                        }
                    }
                    if (_ThreeDToolAction != null)
                    {
                        comparisonActionObj.Actions.Add(new WebAction
                        {
                            DelaySeconds = 1,
                            Props = new ElementProps()
                            {
                                IFrameID = "Compare2DTool",
                                ParentID = "optioncontroller",
                                TagItem = new TagProps("span", text: "3d tool")
                            },
                            Click = true
                        });
                        comparisonActionObj.Actions.Add(new WebAction
                        {
                            DelaySeconds = 5,
                            Props = new ElementProps()
                            {
                                IFrameID = "Compare3DToolThreeJS",
                                ParentID = "imageLeftSlideCtr",
                                ClassItem = new ClassProps("processbar"),
                                Displayed = false
                            }
                        });
                        comparisonActionObj.Actions.Add(new WebAction
                        {
                            DelaySeconds = 5,
                            Props = new ElementProps()
                            {
                                IFrameID = "Compare3DToolThreeJS",
                                ParentID = "imageRightSlideCtr",
                                // TagItem = new TagProps("p", text: "Generating..."),
                                ClassItem = new ClassProps("processbar"),
                                Displayed = false
                            }
                        });
                        if (_ThreeDToolAction.pTakeScreenShot)
                        {
                            comparisonActionObj.Actions.Add(new WebAction(VSSystem.ThirdParty.Selenium.Define.EActionType.ScreenShot)
                            {
                                DelaySeconds = 10,
                                FileName = "ThreeDTool",
                                FolderPath = string.Format("{0}/screenshots/{1}", ServiceConfig.pools_temp, string.Format(sessionFormat, now)),
                            });
                        }
                    }

                    result.Add(comparisonActionObj);
                }

            }
            catch { }
            return result;
        }
    }
}