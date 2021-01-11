(function(window,document,undefined){
    function MyArray(){

    }
    /**
     * 冒泡排序 思想:总是比较相邻的元素
     * @param arr
     * @returns {*|Array}
     */
    MyArray.prototype.fnBubbleSort = function (arr) {
        var temp = null;
        arr = arr || [];
        for (var i = 0, arrLength = arr.length; i < arrLength - 1; i++) {//经历这样的循环，排序一定完成
            for (var j = 0; j < arrLength - 1 - i; j++) {//每一次循环，一定能找到一个最小的
                if (arr[j] < arr[j + 1]) {
                    temp = arr[j + 1];
                    arr[j + 1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        return arr;
    };

    /**
     * 冒泡排序改进 思想:总是比较相邻的元素 记住每一次循环最后交换的位置，下一次循环从这开始
     * @param arr
     * @returns {*|Array}
     */
    MyArray.prototype.fnBubbleSort2 = function (arr) {
        var temp, maxIndex,
            arrLength = arr.length;
        while (arrLength > 0) {
            maxIndex = 0;
            for (var i = 0; i < arrLength; i++) {
                if (arr[i] > arr[i + 1]) {
                    maxIndex = i;
                    temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                }
            }
            arrLength = maxIndex;
        }
        return arr;
    };

    /**
     * 快速排序 思想:选一个轴驱，比它小的数据放左边，比它大的放右边；然后小(大)的一数据，选择一个轴驱，重复以上步骤；
     * @param arr
     * @returns {Array.<T>}
     */
    MyArray.prototype.fnQuickSort = function (arr) {
        var aLeftArr = [], aRightArr = [];
        arr = arr || [];
        for (var i = 0, arrLength = arr.length; i < arrLength - 1; i++) {
            arr[i + 1] < arr[0] ? aRightArr.push(arr[i + 1]) : aLeftArr.push(arr[i + 1]);
        }
        aLeftArr.length && fnQuickSort(aLeftArr);
        aRightArr.length && fnQuickSort(aRightArr);
        return aLeftArr.concat(arr[0], aRightArr);
    };

    /**
     * 插入排序 思想:将每个数据插入排好顺序的数组的适当位置
     * @param arr
     * @returns {*|Array}
     */
    MyArray.prototype.fnInsertSort = function (arr) {
        arr = arr || [];
        // 从1开始，因为一个元素的序列，始终是有序的
        for (var i = 1, j, arrLength = arr.length; i < arrLength; i++) {
            j = i;
            // 保存待排序元素
            v = arr[j];
            // 如果有序序列中的元素大于待插入的元素，则有序列序列中的元素向后移动一个位置
            // 向后移到一个位置，会覆盖待排序的元素，但我们前面有保存待排序元素，所以待排序元素不会丢失
            // 同时，也留出一个位置，以插入待排序元素
            // 直到找一个已经排序的元素，其不大于待排序元素，将待排序元素插入到这里。
            // 如果遍历到有序序列的开始位置，也不存在一个元素不大于待排序元素，则将待排序元素插入到已经排序序列的开始
            while (arr[j - 1] < v) {
                arr[j] = arr[j - 1];
                j--;
                if (j === 0) {
                    break;
                }
            }
            arr[j] = v;
        }
        return arr;
    };

    /**
     * 选择排序 思想:每一次选取一个最大(小)的
     * @param arr
     * @returns {*|Array}
     */
    MyArray.prototype.fnSelectSort = function (arr) {
        var temp = null;
        arr = arr || [];
        for (var i = 0, arrLength = arr.length; i < arrLength - 1; i++) {
            for (var j = i; j < arrLength; j++) {
                if (arr[i] < arr[j]) {
                    temp = arr[j];
                    arr[j] = arr[i];
                    arr[i] = temp;
                }
            }
        }
        return arr;
    };

    /**
     * 选择排序改进 思想:每一次选取一个最大(小)的
     * @param arr
     * @returns {*|Array}
     */
    MyArray.prototype.fnSelectSort2 = function (arr) {
        var temp, minIndex;
        arr = arr || [];
        for (var i = 0, arrLength = arr.length; i < arrLength - 1; i++) {
            minIndex = i;
            for (var j = i + 1; j < arrLength; j++) {
                if (arr[i] > arr[j]) {
                    minIndex = j;
                }
            }
            temp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = temp;
        }
        return arr;
    };

    /**
     * 数组去重复 思想:把不重复的元素放到一个新的数组
     * @param arr
     * @returns {Array}
     */
    MyArray.prototype.fnDuplicateRemove = function (arr) {
        // var newArr = [];
        // for (var i = 0, max = arr.length; i < max; i++) {
        //     if (newArr.indexOf(arr[i]) === -1) {
        //         newArr.push(arr[i]);
        //     }
        // }
        // return newArr;

        var newArr = [], obj = {};
        for (var i = 0,item = {}, max = arr.length; i < max; i++) {
            item = arr[i];
            if (!obj[item]) {
                newArr.push(item);
                obj[item] = true;
            }
        }
        return newArr;

        // return new Set(arr);
    };

    /**
     * 统计数组每个数重复的次数
     * @param arr
     * @returns {{}}
     */
    MyArray.prototype.fnTotalDuplicateChar = function (arr) {
        var obj = {};
        for (var i = 0, max = arr.length, item = {}; i < max; i++) {
            // item = obj[arr[i]];
            obj[arr[i]] ? obj[arr[i]]++ : obj[arr[i]] = 1;
        }
        return obj;
    };



    /**
     * 根据某个属性值在数组中查找对象
     * @param attr
     * @param attrValue
     * @param arr
     */
    MyArray.prototype.fnFindObjByAttr = function (attr, attrValue, arr) {
        for (var i = 0,item = {}; i < arr.length; i++) {
            item = arr[i];
            if(attrValue == item[attr]){
                return {
                    index: i,
                    obj: item
                }
            }
        }
    };

    MyArray.prototype.fnSearch = function(list, searchInfo, isPrecise = false){
        let result = [];
        let _search = function (searchInfo, obj) {
            let isPush = true;
            Object.keys(searchInfo).forEach((key) => {
                if (searchInfo[key]) {
                    if((typeof searchInfo[key] === 'object') && (key in obj)){
                        isPush = isPush && _search(searchInfo[key],obj[key])
                    }else{
                        isPush = isPush && obj[key] && (isPrecise ? searchInfo[key] === obj[key] : new RegExp(searchInfo[key]).test(obj[key]));
                    }
                } else {
                    isPush = true;
                }
            });
            return isPush;
        };
        list.forEach((obj) => {
            if (_search(searchInfo, obj)) {
                result.push(obj);
            }
        });
        return result;
    };

    window.myArray = new MyArray();
}(window,document));