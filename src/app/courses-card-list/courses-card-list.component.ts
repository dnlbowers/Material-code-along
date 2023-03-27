import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Course} from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

import { openEditCourseDialogue } from '../course-dialog/course-dialog.component';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {

    @Input()
    courses: Course[];

    cols = 3;
    rowHeight = '500px';

    constructor(private dialog: MatDialog, private responsive: BreakpointObserver) {
    }

    ngOnInit() {
        this.responsive.observe([
            Breakpoints.TabletPortrait,
            Breakpoints.TabletLandscape,
            Breakpoints.HandsetPortrait,
            Breakpoints.HandsetLandscape
        ]).subscribe(result => {

            this.cols = 3;
            this.rowHeight = '500px';

            const breakpoints = result.breakpoints;
            if (breakpoints[Breakpoints.TabletPortrait]) {
                this.cols = 1;
            } else if (breakpoints[Breakpoints.TabletLandscape]) {
                this.cols = 2;
            } else if (breakpoints[Breakpoints.HandsetPortrait]) {
                this.cols = 1;
                this.rowHeight = '430px';
            } else if (breakpoints[Breakpoints.HandsetLandscape]) {
                this.cols = 1;
            }
        });
    }

    editCourse(course:Course) {

        openEditCourseDialogue(this.dialog, course)
            .pipe(
                filter(val => !!val)
            )    
            .subscribe(
                val => console.log("new course value", val)
            );

    }

}









