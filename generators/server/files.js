/**
 * Copyright 2013-2020 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const _ = require('lodash');
const constants = require('generator-jhipster/generators/generator-constants');


/* Constants use throughout */
const INTERPOLATE_REGEX = constants.INTERPOLATE_REGEX;
const SERVER_MAIN_SRC_DIR = constants.SERVER_MAIN_SRC_DIR;
const SERVER_MAIN_RES_DIR = constants.SERVER_MAIN_RES_DIR;

/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
 */
const serverFiles = {
    ServerSource: [
        {
            path: SERVER_MAIN_RES_DIR,
            templates: [{ file: 'newbanner.txt', method: 'copy', noEjs: true }]
        },
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [{
                file: `package/web/rest/TestGraphqlResource.java`,
                renameTo: generator => `${generator.packageFolder}/web/rest/TestGraphqlResource.java`,
                method: 'copy',
                noEjs: true
            }]
    
        },
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [{
                file: 'package/web/rest/TestGraphqlController.java',
                renameTo: generator => `${generator.packageFolder}/web/rest/TestGraphqlController.java`
            }]
    
        }
    ],
    ServerBuildA: [
        {
            condition: generator => generator.buildTool === 'gradle',
            templates: [
                'build.gradle'
            ]
        },
        {
            condition: generator => generator.buildTool === 'maven',
            templates: [
                { file: 'pom.xml', options: { interpolate: INTERPOLATE_REGEX } }
            ]
        }
    ]
};

module.exports = {
    writeFiles,
    serverFiles
};

function writeFiles() {
    return {
        writeSamFiles() {
            if (this.skipServer) return;

            // write server side files
            this.writeFilesToDisk(serverFiles, this, false);
        }
    };
}
