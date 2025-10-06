import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Download, BarChart3, PieChart, Map } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { biodiversityAPI } from '../services/api';
import { AnalysisResult } from '../types/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Respons
