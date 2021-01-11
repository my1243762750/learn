<template>
    <div>
        <el-form-item label="起止时间" prop="effectiveTime">
            <el-date-picker
                    :editable="false"
                    :picker-options="pickerOptions"
                    :default-time="['00:00:00','23:59:59']"
                    v-model="adForm.effectiveTime"
                    type="datetimerange"
                    value-format="timestamp"
                    range-separator="—"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7
                    }
                },
                adForm: {
                    effectiveTime
                }
            }
        }
    }
</script>

<style scoped>

</style>