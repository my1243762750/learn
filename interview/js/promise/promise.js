// 先搭建一个基本结构, 有暗中状态pending rejected fulfilled
class MyPromise {
    static PENDING = 'pending';
    static REJECTED = 'rejected';
    static FULFILLED = 'fulfilled';

    constructor(fn) {
        this.state = MyPromise.PENDING;
        this.result = undefined;
        this.callbacks = [];

        if (typeof fn !== 'function') {
            throw new Error(`${fn} is not a function`);
        }

        let resolve = (val) => {
            if (this.state === MyPromise.PENDING) {
                this.state = MyPromise.FULFILLED;
                this.result = val;
                setTimeout(() => {
                    this.callbacks.forEach((item) => {
                        item.onFulfilled(val);
                    })
                })
            }
        }

        let reject = (val) => {
            if (this.state === MyPromise.PENDING) {
                this.state = MyPromise.REJECTED;
                this.result = val;
                setTimeout(() => {
                    this.callbacks.forEach((item) => {
                        item.onRejected(val);
                    })
                })
            }
        }

        try {
            fn(resolve.bind(this), reject.bind(this));
        } catch (e) {
            // todo
            reject(e);
        }

    }

    then(onFulfilled, onRejected) {
        if (typeof onFulfilled !== 'function') {
            onFulfilled = () => {
            };
        }
        if (typeof onRejected !== 'function') {
            onRejected = () => {
            };
        }

        let commonFn = (promise, result, resolve, reject) => {
            if (promise === result) {
                throw new TypeError('不能返回本身');
            }
            try {
                if (result instanceof MyPromise) {
                    result.then(resolve, reject);
                } else {
                    resolve(result);
                }
            } catch (e) {
                reject(e);
            }
        }

        const promise = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                if (this.state === MyPromise.PENDING) {
                    this.callbacks.push({
                        onFulfilled: (val) => {
                            commonFn(promise, val, resolve, reject);
                        },
                        onRejected: (val) => {
                            commonFn(promise, val, resolve, reject);
                        }
                    })
                } else if (this.state === MyPromise.FULFILLED) {
                    commonFn(promise, onFulfilled(this.result), resolve, reject);
                } else if (this.state === MyPromise.REJECTED) {
                    commonFn(promise, onRejected(this.result), resolve, reject);
                }
            });
        });
        return promise;
    }

    // todo
    catch(fn) {
        return new MyPromise((resolve, reject) => {
            this.callbacks.push({
                onCatch: fn
            });
            resolve(this.result);
        })
    }

    // todo
    finally(fn) {
        return new MyPromise((resolve, reject) => {
            this.callbacks.push({
                onFinally: fn
            });
        })
    }

    static resolve(val) {
        return new MyPromise((resolve, reject) => {
            if (val instanceof MyPromise) {
                val.then(resolve, reject);
            } else {
                resolve(val);
            }
        })
    }

    static reject(val) {
        return new MyPromise((resolve, reject) => {
            reject(val);
        })
    }

    static all(promises) {
        let result = [];
        return new MyPromise((resolve, reject) => {
            promises.forEach((promise) => {
                promise.then((val) => {
                    result.push(val)
                    if (result.length === promises.length) {
                        resolve(result);
                    }
                }, (err) => {
                    reject(err);
                })
            })
        })
    }

    static race(promises) {
        return new MyPromise((resolve, reject) => {
            promises.forEach((promise) => {
                promise.then((val) => {
                    resolve(val);
                }, (err) => {
                    reject(err);
                })
            })
        })
    }
}
