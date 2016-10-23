/* tslint:disable:no-unused-variable */
import * as React from "react";
import * as css from "./css/main";
import {fontAwesome} from "./css/FontAwesome";
import {watchManager} from "../plugins/GitWatcher";

const PresentWorkingDirectory = ({presentWorkingDirectory}: { presentWorkingDirectory: string }) =>
    <div style={css.statusBar.presentDirectory}>
        <span style={css.statusBar.icon} dangerouslySetInnerHTML={{__html: fontAwesome.folderOpen}}/>
        {presentWorkingDirectory}
    </div>;

const VcsDataComponent = ({data}: { data: VcsData }) => {
    if (data.kind === "repository") {
        return (
            <div style={css.statusBar.vcsData}>
                <div style={css.statusBar.status(data.status)}>
                    {(data.status === 'dirty') ?
                      (<span>
                        <span style={css.statusBar.stagedFileChanges}>
                          {
                            '+' + String(data.changes.stagedAdded) + ' ' +
                            '~' + String(data.changes.stagedModified) + ' ' +
                            '-' + String(data.changes.stagedDeleted) + ' ' +
                            '!' + String(data.changes.stagedUnmerged) + ' '
                          }
                        </span>
                        {'| '}
                        <span style={css.statusBar.unstagedFileChanges}>
                          {
                            '+' + String(data.changes.unstagedAdded) + ' ' +
                            '~' + String(data.changes.unstagedModified) + ' ' +
                            '-' + String(data.changes.unstagedDeleted) + ' ' +
                            '!' + String(data.changes.unstagedUnmerged) + ' '
                          }
                        </span>
                      </span>)  :
                      null
                    }
                    <span style={css.statusBar.icon} dangerouslySetInnerHTML={{__html: fontAwesome.longArrowDown}}/>
                    {data.pull}
                    <span style={css.statusBar.icon} dangerouslySetInnerHTML={{__html: fontAwesome.longArrowUp}}/>
                    {data.push}
                    <span style={css.statusBar.icon} dangerouslySetInnerHTML={{__html: fontAwesome.codeFork}}/>
                    {data.branch}
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
};

export const StatusBarComponent = ({presentWorkingDirectory}: { presentWorkingDirectory: string }) =>
    <div style={css.statusBar.itself}>
        <PresentWorkingDirectory presentWorkingDirectory={presentWorkingDirectory}/>
        <VcsDataComponent data={watchManager.vcsDataFor(presentWorkingDirectory)}/>
    </div>;
