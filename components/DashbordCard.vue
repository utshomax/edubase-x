<template>
   <v-row>
        <v-col lg="3" cols="sm" class="pb-2">
                <v-card>
                    <v-row class="no-gutters">
                        <div class="col-auto">
                            <div class="cyan fill-height">&nbsp;</div>
                        </div>
                        <div class="col pa-3 py-4 cyan--text">
                            <h5 class="text-truncate text-uppercase">PAMENTS</h5>
                            <h1>{{paid}}</h1>
                        </div>
                    </v-row>
                </v-card>
            </v-col>
            <v-col lg="3" cols="sm" class="pb-2">
                <v-card>
                    <v-row class="no-gutters">
                        <div class="col-auto">
                            <div class="primary fill-height">&nbsp;</div>
                        </div>
                        <div class="col pa-3 py-4 primary--text">
                            <h5 class="text-truncate text-uppercase">DUES</h5>
                            <h1>{{due}}</h1>
                        </div>
                    </v-row>
                </v-card>
            </v-col>
            <v-col lg="3" cols="sm" class="pb-2">
                <v-card>
                    <v-row class="no-gutters">
                        <div class="col-auto">
                            <div class="green fill-height">&nbsp;</div>
                        </div>
                        <div class="col pa-3 py-4 green--text">
                            <h5 class="text-truncate text-uppercase">MESSAGES</h5>
                            <h1 :class="{'red--text' : Number(msg) < 15}">{{msg}}</h1>
                        </div>
                    </v-row>
                </v-card>
            </v-col>
            <v-col lg="3" cols="sm" class="pb-2">
                <v-card>
                    <v-row class="no-gutters">
                        <div class="col-auto">
                            <div class="teal fill-height">&nbsp;</div>
                        </div>
                        <div class="col pa-3 py-4 teal--text">
                            <h5 class="text-truncate text-uppercase">Pending</h5>
                            <h1>{{pending}}</h1>
                        </div>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
</template>

<script>
export default {
 props:['paid','due','msg','pending']
}
</script>

<style>

</style>