<template>
    <div></div>
</template>

<script>
    import Countup from 'vux/src/components/countup'

    import M from '../assets/js/common.js';

    import {
        initCordova
    } from '../assets/js/requestnative-phonegap.js';

    export default {
        components: {
            Countup
        },
        data() {
            return {
                ssoToken: '',
                ada: '', //ada号
                loading: false, //loading
                isData: false, //isData
                isIOS: true, //是否是ios
                isNetworkErr: false, //网络错误，点击刷新
                showCommissionPrompt: false, //显示佣金获取提示
                data: '', //返回信息
                isUser: false, //是否绑定收款账户
                isARoll: false, //金额滚动
                isARollInit: 0.00, //滚动初始金额
                accumulatedCommissionLast: 0.00, //上一次累计佣金
                accumulatedCommission: 0.00, //当前累计佣金
                showDetail: false,
                noAccess: false,
            }
        },
        mounted() {
            var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

            if (!isIOS) {
                this.isIOS = false;
            }

            let _this = this;

            if (!sessionStorage.getItem("_tmp_is_reload") && M.isAndroid) {
                sessionStorage.setItem("_tmp_is_reload", true);
                location.reload();
                return;
            }
            if (M.getUrlQuery('channel').length > 0) {
                sessionStorage.setItem("_tmp_channel", M.getUrlQuery('channel'));
            }
            // alert(sessionStorage.getItem('_tmp_init_cordova'))
            if (sessionStorage.getItem('_tmp_init_cordova')) {
                _this.doMounted();
            } else {
                initCordova(function () {
                    sessionStorage.setItem('_tmp_init_cordova', true);
                    setTimeout(() => {
                        _this.doMounted();
                    }, 10);
                });
            }
        },
        methods: {
            doMounted() {
                let _this = this;
                // setTimeout(() => {
                if (process.env.NODE_ENV != "development") {
                    deviceReady(() => {
                        if (M.getUrlQuery('ssoToken').length > 0) {
                            _this.ssoToken = M.getUrlQuery('ssoToken');
                            _this.loading = true;
                            _this.ApiCommon.sendAjaxByPost(_this.ApiCommon.interface.getSSoUserInfo, {
                                ssoToken: _this.ssoToken
                            }, (d) => {
                                _this.loading = false;
                                if (d.succeeded) {
                                    _this.ada = d.result.ada;
                                    localStorage.setItem('3EAda', d.result.ada);
                                    sessionStorage.setItem('3EAda', d.result.ada);
                                    _this._identify(d.result);
                                    _this._basicInfo();
                                } else {
                                    _this.isNetworkErr = true;
                                }
                            });
                        } else {
                            phonegap.getHubServiceInfo((success) => {
                                //获取登录信息成功
                                _this.ada = success.ada;
                                localStorage.setItem('3EAda', success.ada);
                                sessionStorage.setItem('3EAda', success.ada);
                                _this._basicInfo();
                                _this._identify(success);
                            }, (error) => {
                                //获取登录信息失败
                                _this.isNetworkErr = true;
                            });
                        }
                    });
                } else {
                    let ada = this.myCommon.getUrlQuery("ada", window.location.href);
                    if (ada) {
                        localStorage.setItem('3EAda', JSON.stringify(ada));
                    }
                    this.ada = JSON.parse(localStorage.getItem('3EAda'));
                    this._basicInfo();
                }
                // }, 10);
            },
            _backToHome() {
                phonegap.backToParentPageByNative();
            },
            _identify(data) {
                if (data.masterAmwayId) {
                    zhuge.identify(data.masterAmwayId, {
                        '用户类型': data.userType || 'ABO',
                        'ADA': data.ada
                    });
                }
                zhuge.track('我的微购首页', {
                    '事件类型': '页面浏览',
                    '页面类别': '我的微购', //数值型属性不要带引号
                    '页面详情': '我的微购首页'
                });
            },
            _basicInfo() { //基础信息
                let _this = this;
                _this.loading = true;
                _this.ApiCommon.sendAjaxByPost(_this.ApiCommon.interface.queryWallet, {
                    distributorNumber: _this.ada
                }, (d) => {
                    _this.loading = false;
                    if (d.succeeded) {
                        _this.data = d.result;
                        _this.accumulatedCommission = Number(d.result.accumulatedCommission);
                        if (JSON.parse(localStorage.getItem('3EKickback')) != d.result.accumulatedCommission) {
                            _this.isARoll = true;
                            localStorage.setItem('3EKickback', JSON.stringify(d.result.accumulatedCommission));
                        } else {
                            _this.isARoll = false;
                            _this.isARollInit = Number(JSON.parse(localStorage.getItem('3EKickback')));
                        }
                        if (!d.result.accountName) {
                            _this.isUser = false;
                        } else {
                            _this.isUser = true;
                        }
                        _this.retrieveAdaInfo();
                    } else {
                        _this.isNetworkErr = true;
                    }
                });
            },
            retrieveAdaInfo() {
                let _this = this;
                _this.isData = true;
                _this.noAccess = false;
                return;

                _this.loading = true;

                _this.ApiCommon.sendAjaxByPost(_this.ApiCommon.interface.retrieveAdaInfo, {
                    ada: _this.ada,
                    channelId: sessionStorage.getItem("_tmp_channel")
                }, (d) => {
                    _this.loading = false;
                    if (d.succeeded) {
                        if (d.result) {
                            if ((d.result.distributorType === 'C' || d.result.distributorType === 'D') && d.result.attributiveShopManageClass === 'S') {
                                _this.isData = false;
                                _this.noAccess = true;
                            } else {
                                _this.isData = true;
                                _this.noAccess = false;
                            }
                        }
                    }
                });
            },
            _redirectOrder() { //云购订单
                let _this = this;
                _this.loading = true;

                zhuge.track('点击导航_我的微购', {
                    '事件类型': '点击事件',
                    '事件详情': '微购订单', //数值型属性不要带引号
                    '行为类型': '点击',
                    '行为对象': '链接',
                    '页面名称': '微购订单'
                });
                _this.ApiCommon.sendAjaxByPost(_this.ApiCommon.interface.redirectOrder, {
                    distributorNumber: _this.ada
                }, (d) => {
                    _this.loading = false;
                    if (d.succeeded) {
                        phonegap.callInside(d.result, "微购订单", () => {

                        });
                    } else {

                    }
                });
            },
            _redirectProduct() { //微购产品
                let _this = this;
                _this.loading = true;
                zhuge.track('点击微购产品_我的微购', {
                    '事件类型': '点击事件',
                    '事件详情': '微购产品', //数值型属性不要带引号
                    '行为类型': '点击',
                    '行为对象': '链接',
                    '页面名称': '微购产品'
                });
                _this.ApiCommon.sendAjaxByPost(_this.ApiCommon.interface.redirectProduct, {
                    distributorNumber: _this.ada
                }, (d) => {
                    _this.loading = false;
                    if (d.succeeded) {
                        phonegap.callInside(d.result, "微购专区", () => {

                        });
                    } else {

                    }
                });
            },
            _showCommissionPrompt() {
                this.showCommissionPrompt = false;
            },
            _refreshBack() { //网络错误，点击刷新
                this.isNetworkErr = false;
                //location.reload()//刷新
                this.doMounted();
            },
            _goKickbackInfo() { //跳转佣金明细
                if (this.data.hasCommissionDetails == 0) return false;
                this.$router.push('/kickbackInfo');
            },
            _goAccount() { //跳转账户绑定
                zhuge.track('点击导航_我的微购', {
                    '事件类型': '点击事件',
                    '事件详情': '收款账户', //数值型属性不要带引号
                    '行为类型': '点击',
                    '行为对象': '链接',
                    '页面名称': '收款账户'
                });
                this.$router.push('/account');

            }
        }
    }
</script>

<style scoped>

</style>