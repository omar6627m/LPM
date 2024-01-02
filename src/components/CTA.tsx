import React from 'react';
import {Button} from "@/components/ui/button";
import {CiExport} from "react-icons/ci";
import {IoMdAdd} from "react-icons/io";

const CTA = () => {
    return (
        <div className="py-4 flex justify-between items-center">
            <div className="flex space-x-4">
                <Button variant="outline">
                    <CiExport className="mr-2 h-4 w-4" /> Import
                </Button>
                <Button variant="outline">
                    <CiExport className="mr-2 h-4 w-4" /> Export
                </Button>
            </div>
            <Button variant="default" size="icon">
                <IoMdAdd className="h-4 w-4" />
            </Button>
        </div>
    );
};

export default CTA;
